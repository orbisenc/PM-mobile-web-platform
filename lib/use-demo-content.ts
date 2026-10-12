"use client";

import { useCallback, useEffect, useState } from "react";
import { defaultProject, STORAGE_KEY } from "@/lib/demo-data";
import type { ProjectContent } from "@/lib/types";

export function useDemoContent() {
  const [project, setProject] = useState<ProjectContent>(defaultProject);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      if (value) setProject({ ...defaultProject, ...JSON.parse(value) });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setHydrated(true);
  }, []);

  const save = useCallback((next: ProjectContent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setProject(next);
    window.dispatchEvent(new Event("demo-content-updated"));
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProject(defaultProject);
  }, []);

  return { project, save, reset, hydrated };
}
