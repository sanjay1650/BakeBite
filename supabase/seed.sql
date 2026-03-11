-- Seed Data for BAKEBITE

-- Insert Categories
INSERT INTO categories (name, slug, description) VALUES
('Classic', 'classic', 'Timeless favorites everyone loves.'),
('Gourmet', 'gourmet', 'Elevated flavors with premium ingredients.'),
('Custom', 'custom', 'Personalized cookies for special occasions.'),
('Vegan', 'vegan', 'Plant-based deliciousness.'),
('Gluten-Free', 'gluten-free', 'Crave-worthy without the gluten.');

-- Insert Products (20+ cookies)
-- Note: Replace placeholder image URLs with actual cookie images later or use Unsplash
INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags, is_featured) 
SELECT 
    'Ultimate Chocolate Chip', 'ultimate-chocolate-chip', 'Thick, chewy, and loaded with semi-sweet chocolate chips.', 3.99, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80', 100, id, '{}', true FROM categories WHERE slug = 'classic';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags, is_featured) 
SELECT 
    'Sea Salt Dark Chocolate', 'sea-salt-dark-chocolate', 'Rich dark chocolate balanced with a sprinkle of flaky sea salt.', 4.50, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80', 50, id, '{}', true FROM categories WHERE slug = 'gourmet';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Classic Oatmeal Raisin', 'classic-oatmeal-raisin', 'Soft and spicy with plump raisins and wholesome oats.', 3.50, 'https://images.unsplash.com/photo-1603191993041-600375cf851a?auto=format&fit=crop&w=800&q=80', 75, id, '{}' FROM categories WHERE slug = 'classic';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Double Chocolate Walnut', 'double-chocolate-walnut', 'A chocolate lover''s dream with crunchy walnuts.', 4.25, 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80', 40, id, '{}' FROM categories WHERE slug = 'classic';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Red Velvet Cream Cheese', 'red-velvet-cream-cheese', 'Vibrant red cookies with a creamy filling.', 4.99, 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=800&q=80', 30, id, '{}' FROM categories WHERE slug = 'gourmet';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Lemon White Chocolate', 'lemon-white-chocolate', 'Zesty lemon meets silky white chocolate.', 4.25, 'https://images.unsplash.com/photo-1605691017409-cf8a4872018a?auto=format&fit=crop&w=800&q=80', 45, id, '{}' FROM categories WHERE slug = 'gourmet';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Peanut Butter Perfection', 'peanut-butter-perfection', 'Creamy, nutty, and melt-in-your-mouth.', 3.75, 'https://images.unsplash.com/photo-1590483736622-39da8af7ec8d?auto=format&fit=crop&w=800&q=80', 60, id, '{}' FROM categories WHERE slug = 'classic';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Birthday Cake Explosion', 'birthday-cake-explosion', 'Sprinkles and cake flavor in every bite.', 4.50, 'https://images.unsplash.com/photo-1530131272429-231f64988775?auto=format&fit=crop&w=800&q=80', 50, id, '{}' FROM categories WHERE slug = 'gourmet';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Vegan Choco-Delight', 'vegan-choco-delight', '100% plant-based and delicious.', 4.25, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80', 40, id, '{"vegan"}' FROM categories WHERE slug = 'vegan';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'GF Chocolate Chunk', 'gf-chocolate-chunk', 'Gluten-free but not flavor-free.', 4.50, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80', 35, id, '{"gluten-free"}' FROM categories WHERE slug = 'gluten-free';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Snickerdoodle Sparkle', 'snickerdoodle-sparkle', 'Cinnamon-sugar coated softness.', 3.50, 'https://images.unsplash.com/photo-1597733153203-a54d0fbc47de?auto=format&fit=crop&w=800&q=80', 80, id, '{}' FROM categories WHERE slug = 'classic';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Macadamia Gold', 'macadamia-gold', 'Buttery macadamia nuts and white chocolate.', 4.75, 'https://images.unsplash.com/photo-1557925923-33b27f891f88?auto=format&fit=crop&w=800&q=80', 25, id, '{}' FROM categories WHERE slug = 'gourmet';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'S''mores Campfire', 'smores-campfire', 'Toasted marshmallow, graham cracker, and chocolate.', 4.99, 'https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?auto=format&fit=crop&w=800&q=80', 40, id, '{}' FROM categories WHERE slug = 'gourmet';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Pistachio Rose', 'pistachio-rose', 'Elegant floral notes with nutty pistachio.', 5.25, 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80', 20, id, '{}' FROM categories WHERE slug = 'gourmet';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Vegan Berry Blast', 'vegan-berry-blast', 'Fruit-filled and completely vegan.', 4.50, 'https://images.unsplash.com/photo-1603191993041-600375cf851a?auto=format&fit=crop&w=800&q=80', 30, id, '{"vegan"}' FROM categories WHERE slug = 'vegan';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'GF Peanut Butter', 'gf-peanut-butter', 'High protein, zero gluten.', 4.25, 'https://images.unsplash.com/photo-1590483736622-39da8af7ec8d?auto=format&fit=crop&w=800&q=80', 45, id, '{"gluten-free"}' FROM categories WHERE slug = 'gluten-free';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Matcha Green Tea', 'matcha-green-tea', 'Earthy matcha with white chocolate chips.', 4.75, 'https://images.unsplash.com/photo-1515037880403-edd2a44aa483?auto=format&fit=crop&w=800&q=80', 35, id, '{}' FROM categories WHERE slug = 'gourmet';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Ginger Spice', 'ginger-spice', 'Warm ginger and molasses comfort.', 3.75, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80', 60, id, '{}' FROM categories WHERE slug = 'classic';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Coffee Toffee Crunch', 'coffee-toffee-crunch', 'Espresso-infused with crunchy toffee.', 4.99, 'https://images.unsplash.com/photo-1590483736622-39da8af7ec8d?auto=format&fit=crop&w=800&q=80', 25, id, '{}' FROM categories WHERE slug = 'gourmet';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Caramel Pecan', 'caramel-pecan', 'Gooey caramel and toasted pecans.', 4.75, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80', 30, id, '{}' FROM categories WHERE slug = 'gourmet';

INSERT INTO products (name, slug, description, price, image_url, stock, category_id, dietary_tags) 
SELECT 
    'Pumpkin Spice', 'pumpkin-spice', 'Seasonal favorite available year-round.', 3.99, 'https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=800&q=80', 50, id, '{}' FROM categories WHERE slug = 'classic';
