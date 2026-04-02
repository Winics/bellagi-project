import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://woqntaxdbexfbfvckkcn.supabase.co";
const supabaseKey = "sb_publishable_NxgJySLImbq2HcPSCTQ9hw_BryZDltI";

export const supabase = createClient(supabaseUrl, supabaseKey);