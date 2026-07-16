const SUPABASE_URL = "https://ayvzzdvudqtmewyzpvev.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5dnp6ZHZ1ZHF0bWV3eXpwdmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxNzQzMTcsImV4cCI6MjA5OTc1MDMxN30.SB8Lu4Zn6YFmBFWsrtuR8sEwpHfzXEkJ_R0b-UJw6Y0";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

window.testSupabase = supabaseClient;

console.log("Supabase connected!", supabaseClient);