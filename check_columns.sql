-- STEP 1: Check the exact column names in the lands table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'lands'
ORDER BY column_name;

-- STEP 2: Try the test with lowercase column name
INSERT INTO lands (user_id, location, area, soiltype, price, description)
VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'Test Location',
  100.50,
  'طينية',
  25000,
  'Test description'
);

-- STEP 3: Check if it was inserted
SELECT * FROM lands WHERE location = 'Test Location';

-- STEP 4: If the column doesn't exist, add it with the correct name
ALTER TABLE lands ADD COLUMN IF NOT EXISTS soiltype TEXT;

-- STEP 5: Also add the camelCase version if your frontend expects it
ALTER TABLE lands ADD COLUMN IF NOT EXISTS "soilType" TEXT;
