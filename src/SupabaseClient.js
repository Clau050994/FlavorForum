// src/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hsrgzxhokvqzbeuohryq.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhzcmd6eGhva3ZxemJldW9ocnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1NDExMjQsImV4cCI6MjAyOTExNzEyNH0.DpsydqZY2g5tikhyCAgq_RInBmaSxz1ipV_5Kcbk7sY";
  const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
