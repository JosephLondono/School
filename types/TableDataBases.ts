export interface Contact {
  id: number;
  created_at: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Teacher {
  id: number;
  name: string;
  id_document: number;
  email: string;
  phone: string;
  Academic_Degree: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  featured: boolean;
}
