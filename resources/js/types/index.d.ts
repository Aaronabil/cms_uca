export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface MenuItem {
    id: number;
    name: string;
    url: string;
    parent_id: number | null;
    order: number;
    children: MenuItem[];
}

export interface FacultyData {
    id: number;
    name: string;
    image_url: string;
    slug: string;
    study_programs: Array<{ name: string; slug: string }>;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    site_settings: Record<string, string | null>;
    menus: MenuItem[];
    faculties_global: FacultyData[];
};