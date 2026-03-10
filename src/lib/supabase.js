import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cjlpadbgutcpbvuakkbj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqbHBhZGJndXRjcGJ2dWFra2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMDk4MDIsImV4cCI6MjA4ODY4NTgwMn0.XqiCJIG3qPWuc1SsbjWJFV7NLpGfIzWoC_nmMVYM-OQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
