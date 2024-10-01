"use client";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"sm"}>
          {theme === "light" ? (
            <Sun
              key="light"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : theme === "dark" ? (
            <Moon
              key="dark"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : (
            <Laptop
              key="system"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="start">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => setTheme(e)}>
          <DropdownMenuRadioItem className="flex gap-2" value="light">
            <Sun size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>Claro</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="dark">
            <Moon size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>Oscuro</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="system">
            <Laptop size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>Sistema</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ThemeSwitcherWithText = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;
  const themeSpanish =
    theme === "system" ? "Sistema" : theme === "light" ? "Claro" : "Oscuro";
  return (
    <div className="flex flex-col">
      <div>
        <span className="text-muted-foreground font-semibold">Tema: </span>
        <span>{themeSpanish}</span>
      </div>
      <div className="flex items-center gap-3 justify-center sm:justify-start">
        <span className="text-muted-foreground font-semibold">
          Cambiar tema:{" "}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size={"sm"}>
              {theme === "light" ? (
                <Sun
                  key="light"
                  size={ICON_SIZE}
                  className={"text-muted-foreground"}
                />
              ) : theme === "dark" ? (
                <Moon
                  key="dark"
                  size={ICON_SIZE}
                  className={"text-muted-foreground"}
                />
              ) : (
                <Laptop
                  key="system"
                  size={ICON_SIZE}
                  className={"text-muted-foreground"}
                />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-content" align="start">
            <DropdownMenuRadioGroup
              value={theme}
              onValueChange={(e) => setTheme(e)}>
              <DropdownMenuRadioItem className="flex gap-2" value="light">
                <Sun size={ICON_SIZE} className="text-muted-foreground" />{" "}
                <span>Claro</span>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem className="flex gap-2" value="dark">
                <Moon size={ICON_SIZE} className="text-muted-foreground" />{" "}
                <span>Oscuro</span>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem className="flex gap-2" value="system">
                <Laptop size={ICON_SIZE} className="text-muted-foreground" />{" "}
                <span>Sistema</span>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export { ThemeSwitcher, ThemeSwitcherWithText };
