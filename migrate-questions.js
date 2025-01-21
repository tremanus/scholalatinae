import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Check if environment variables are loaded
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local file');
    console.error('Please make sure you have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file');
    process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Rest of your code remains the same...
async function migrateQuestionsFromFile(filepath, difficulty) {
    try {
        console.log(`\nReading ${difficulty} questions from ${filepath}`);
        
        // Read and parse the JSON file
        const jsonData = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        
        // Transform the questions to match our database schema
        const questions = jsonData.questions.map(q => ({
            question: q.question,
            options: q.options,
            correct_answer: q.correct_answer,
            difficulty: difficulty
        }));

        console.log(`Found ${questions.length} questions in ${difficulty} level`);

        // Insert questions in batches of 50 to avoid timeouts
        for (let i = 0; i < questions.length; i += 50) {
            const batch = questions.slice(i, i + 50);
            const { data, error } = await supabase
                .from('quiz_questions')
                .insert(batch);

            if (error) {
                console.error(`❌ Error inserting batch for ${difficulty}:`, error);
                continue;
            }
            
            console.log(`✓ Inserted batch ${Math.floor(i/50) + 1} for ${difficulty} (${batch.length} questions)`);
        }

        return questions.length;
    } catch (error) {
        console.error(`❌ Error processing ${difficulty} questions:`, error);
        console.error('Error details:', error.message);
        return 0;
    }
}

async function migrateAllQuestions() {
    const files = {
        'beginner': './beginner_questions.json',
        'intermediate': './intermediate_questions.json',
        'advanced': './advanced_questions.json'
    };

    console.log('Starting question migration...');
    let totalQuestions = 0;
    
    for (const [difficulty, filepath] of Object.entries(files)) {
        try {
            // Check if file exists before attempting to migrate
            if (!fs.existsSync(filepath)) {
                console.error(`❌ File not found: ${filepath}`);
                continue;
            }

            const count = await migrateQuestionsFromFile(filepath, difficulty);
            totalQuestions += count;
            console.log(`✓ Successfully migrated ${count} ${difficulty} questions`);
        } catch (error) {
            console.error(`❌ Error with ${difficulty} questions:`, error.message);
        }
    }

    console.log(`\n🎉 Migration completed!`);
    console.log(`Total questions migrated: ${totalQuestions}`);
}

// Run the migration
migrateAllQuestions();