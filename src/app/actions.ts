"use server";

import { encodedRedirect } from "@/src/utils/utils";
import { createClient } from "@/src/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Correo y Contraseña son requeridos" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Revisa tu correo para confirmar tu cuenta"
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const message =
      error.message === "Invalid login credentials"
        ? "Credenciales invalidas"
        : error.message;
    return encodedRedirect("error", "/sign-in", message);
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email es requerido");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    if (error.code === "over_email_send_rate_limit") {
      return encodedRedirect(
        "error",
        "/forgot-password",
        "Demasiados correos enviados, intenta mas tarde"
      );
    }
    return encodedRedirect(
      "error",
      "/forgot-password",
      "No se pudo enviar el correo de restablecimiento de contraseña"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Revisa tu correo Electronico para restablecer tu contraseña."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Contraseña y confirmar contraseña son requeridos"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Las contraseñas no coinciden"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    console.error(error);
    if (error.code === "same_password") {
      encodedRedirect(
        "error",
        "/protected/reset-password",
        "La contraseña es la misma que la anterior"
      );
    }
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "No se pudo actualizar la contraseña"
    );
  }

  encodedRedirect(
    "success",
    "/protected/reset-password",
    "Contraseña actualizada"
  );
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const contactAction = async (formData: FormData) => {
  const supabase = createClient();
  const nameData = formData.get("name") as string;
  const emailData = formData.get("email") as string;
  const subjectData = formData.get("subject") as string;
  const messageData = formData.get("message") as string;
  if (!nameData || !emailData || !subjectData || !messageData) {
    return encodedRedirect(
      "error",
      "/contact",
      "Todos los campos son requeridos"
    );
  }

  const { error } = await supabase.from("contact").insert([
    {
      name: nameData,
      email: emailData,
      subject: subjectData,
      message: messageData,
    },
  ]);

  if (error) {
    return encodedRedirect("error", "/contact", "No se pudo enviar el mensaje");
  }
  encodedRedirect(
    "success",
    "/contact",
    "Mensaje enviado correctamente, nos pondremos en contacto contigo"
  );
};

export const eventUpdate = async (formData: FormData) => {
  const supabase = createClient();
  const idEvent = formData.get("id") as string;
  const titleEvent = formData.get("title") as string;
  const descriptionEvent = formData.get("description") as string;
  const dateEvent = formData.get("date") as string;
  const featured = formData.get("featured") as string;

  const featuredEvent = featured === "on" ? true : false;

  const image = formData.get("image") as File;

  if (!idEvent || !titleEvent || !descriptionEvent || !dateEvent) {
    return encodedRedirect(
      "error",
      "/dashboard/events",
      "Todos los campos son requeridos"
    );
  }

  if (image.size > 0) {
    // Convertir el archivo de imagen en un array buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Promesa para manejar la subida de la imagen a Cloudinary
    const uploadToCloudinary = new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "JL-School",
          use_filename: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result!.secure_url); // Asegúrate de que result no sea null
          }
        }
      );
      uploadStream.end(buffer); // Finalizar la subida con el buffer de la imagen
    });

    let imageUrl: string;
    try {
      imageUrl = await uploadToCloudinary; // Espera a que la imagen sea subida y obtén la URL
    } catch (error) {
      return encodedRedirect(
        "error",
        "/dashboard/events",
        "Error al guardar la imagen"
      );
    }
    const { error: updateError } = await supabase
      .from("events")
      .update({
        id: idEvent,
        title: titleEvent,
        description: descriptionEvent,
        date: dateEvent,
        featured: featuredEvent,
        url_image: imageUrl,
      })
      .eq("id", idEvent);
    if (updateError) {
      return encodedRedirect(
        "error",
        "/dashboard/events",
        "No se pudo editar el evento"
      );
    }
  } else {
    const { error: updateError } = await supabase
      .from("events")
      .update({
        id: idEvent,
        title: titleEvent,
        description: descriptionEvent,
        date: dateEvent,
        featured: featuredEvent,
      })
      .eq("id", idEvent);

    if (updateError) {
      return encodedRedirect(
        "error",
        "/dashboard/events",
        "No se pudo editar el evento"
      );
    }
  }
  encodedRedirect(
    "success",
    "/dashboard/events",
    "Evento editado correctamente"
  );
};

export const eventDelete = async (formData: FormData) => {
  const supabase = createClient();
  const idEvent = formData.get("id") as string;

  if (!idEvent)
    return encodedRedirect(
      "error",
      "/dashboard/events",
      "No se pudo eliminar el evento"
    );

  const { error } = await supabase.from("events").delete().eq("id", idEvent);

  if (error) {
    return encodedRedirect(
      "error",
      "/dashboard/events",
      "No se pudo eliminar el evento"
    );
  }
  encodedRedirect(
    "success",
    "/dashboard/events",
    "Evento Eliminado correctamente"
  );
};

export const eventCreate = async (formData: FormData) => {
  const supabase = createClient();
  const titleEvent = formData.get("title") as string;
  const descriptionEvent = formData.get("description") as string;
  const dateEvent =
    (formData.get("date") as string) || new Date().toISOString();
  const formattedDate = dateEvent.split("T")[0];

  const featured = formData.get("featured") as string;
  const featuredEvent = featured === "on" ? true : false;

  const image = formData.get("image") as File;

  if (!titleEvent || !descriptionEvent || !dateEvent) {
    return encodedRedirect(
      "error",
      "/dashboard/events",
      "Todos los campos son requeridos"
    );
  }

  console.log(dateEvent);

  if (image.size > 0) {
    // Convertir el archivo de imagen en un array buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Promesa para manejar la subida de la imagen a Cloudinary
    const uploadToCloudinary = new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "JL-School",
          use_filename: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result!.secure_url); // Asegúrate de que result no sea null
          }
        }
      );
      uploadStream.end(buffer); // Finalizar la subida con el buffer de la imagen
    });

    let imageUrl: string;
    try {
      imageUrl = await uploadToCloudinary; // Espera a que la imagen sea subida y obtén la URL
    } catch (error) {
      return encodedRedirect(
        "error",
        "/dashboard/events",
        "Error al guardar la imagen"
      );
    }
    const { error: updateError } = await supabase.from("events").insert({
      title: titleEvent,
      description: descriptionEvent,
      date: formattedDate,
      featured: featuredEvent,
      url_image: imageUrl,
    });
    if (updateError) {
      return encodedRedirect(
        "error",
        "/dashboard/events",
        "No se pudo crear el evento"
      );
    }
  } else {
    const { error: updateError } = await supabase.from("events").insert({
      title: titleEvent,
      description: descriptionEvent,
      date: formattedDate,
      featured: featuredEvent,
    });

    if (updateError) {
      return encodedRedirect(
        "error",
        "/dashboard/events",
        "No se pudo crear el evento"
      );
    }
  }
  encodedRedirect(
    "success",
    "/dashboard/events",
    "Evento creado correctamente"
  );
};

export const teacherCreate = async (formData: FormData) => {
  const supabase = createClient();
  const name = formData.get("name") as string;
  const num_document = formData.get("id_document") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const academic_degree = formData.get("academic_degree") as string;

  if (!name || !num_document || !email || !phone || !academic_degree) {
    return encodedRedirect(
      "error",
      "/dashboard/teachers",
      "Todos los campos son requeridos"
    );
  }

  const { error } = await supabase.from("teachers").insert([
    {
      name: name,
      id_document: num_document,
      email: email,
      phone: phone,
      academic_degree: academic_degree,
    },
  ]);

  if (error) {
    if (error.code === "23505") {
      return encodedRedirect(
        "error",
        "/dashboard/teachers",
        "El profesor con ese documento ya existe"
      );
    }
    return encodedRedirect(
      "error",
      "/dashboard/teachers",
      "No se pudo crear el profesor"
    );
  }

  return encodedRedirect(
    "success",
    "/dashboard/teachers",
    "Profesor creado correctamente"
  );
};

export const teacherUpdate = async (formData: FormData) => {
  const supabase = createClient();
  const idTeacher = formData.get("id") as string;
  const name = formData.get("name") as string;
  const num_document = formData.get("id_document") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const academic_degree = formData.get("academic_degree") as string;

  if (!name || !num_document || !email || !phone || !academic_degree) {
    return encodedRedirect(
      "error",
      "/dashboard/teachers",
      "Todos los campos son requeridos"
    );
  }

  const { error } = await supabase
    .from("teachers")
    .update({
      name: name,
      id_document: num_document,
      email: email,
      phone: phone,
      academic_degree: academic_degree,
    })
    .eq("id", idTeacher);

  if (error) {
    return encodedRedirect(
      "error",
      "/dashboard/teachers",
      "No se pudo editar el profesor"
    );
  }

  return encodedRedirect(
    "success",
    "/dashboard/teachers",
    "Profesor editado correctamente"
  );
};

export const teacherDelete = async (formData: FormData) => {
  const supabase = createClient();
  const idTeacher = formData.get("id") as string;

  if (!idTeacher)
    return encodedRedirect(
      "error",
      "/dashboard/teachers",
      "No se pudo eliminar el profesor"
    );

  const { error } = await supabase
    .from("teachers")
    .delete()
    .eq("id", idTeacher);

  if (error) {
    return encodedRedirect(
      "error",
      "/dashboard/teachers",
      "No se pudo eliminar el profesor"
    );
  }
  encodedRedirect(
    "success",
    "/dashboard/teachers",
    "Profesor Eliminado correctamente"
  );
};
