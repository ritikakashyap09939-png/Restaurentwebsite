import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  type: 'veg' | 'non-veg';
  category: string;
};

const menuData: MenuItem[] = [
  // Starters
  { id: 's1', name: 'Paneer Tikka', desc: 'Marinated cottage cheese cooked in tandoor', price: 280, type: 'veg', category: 'Starters' },
  { id: 's2', name: 'Hara Bhara Kebab', desc: 'Spinach and green peas patties spiced perfectly', price: 240, type: 'veg', category: 'Starters' },
  { id: 's3', name: 'Chicken Tikka', desc: 'Tender chicken pieces in classic red marinade', price: 320, type: 'non-veg', category: 'Starters' },
  { id: 's4', name: 'Fish Amritsari', desc: 'Batter-fried fish flavored with carom seeds', price: 380, type: 'non-veg', category: 'Starters' },
  { id: 's5', name: 'Crispy Corn', desc: 'Fried corn kernels tossed in spicy seasoning', price: 220, type: 'veg', category: 'Starters' },

  // Main Course Veg
  { id: 'v1', name: 'Dal Makhani', desc: 'Black lentils simmered overnight with butter and cream', price: 260, type: 'veg', category: 'Main Veg' },
  { id: 'v2', name: 'Paneer Butter Masala', desc: 'Cottage cheese in rich tomato gravy', price: 310, type: 'veg', category: 'Main Veg' },
  { id: 'v3', name: 'Kadhai Paneer', desc: 'Paneer tossed with bell peppers and ground spices', price: 300, type: 'veg', category: 'Main Veg' },
  { id: 'v4', name: 'Malai Kofta', desc: 'Potato and cheese dumplings in rich cashew gravy', price: 320, type: 'veg', category: 'Main Veg' },
  { id: 'v5', name: 'Mix Veg', desc: 'Seasonal vegetables cooked dry with spices', price: 240, type: 'veg', category: 'Main Veg' },

  // Main Course Non-Veg
  { id: 'nv1', name: 'Butter Chicken', desc: 'Tandoori chicken in sweet and creamy tomato gravy', price: 380, type: 'non-veg', category: 'Main Non-Veg' },
  { id: 'nv2', name: 'Chicken Curry Home Style', desc: 'Traditional thin spicy chicken gravy', price: 350, type: 'non-veg', category: 'Main Non-Veg' },
  { id: 'nv3', name: 'Mutton Rogan Josh', desc: 'Kashmiri style slow-cooked lamb curry', price: 450, type: 'non-veg', category: 'Main Non-Veg' },
  { id: 'nv4', name: 'Kadhai Chicken', desc: 'Spicy chicken cooked with chunky bell peppers', price: 370, type: 'non-veg', category: 'Main Non-Veg' },

  // Breads
  { id: 'b1', name: 'Butter Naan', desc: 'Soft layered bread from the tandoor', price: 60, type: 'veg', category: 'Breads' },
  { id: 'b2', name: 'Garlic Naan', desc: 'Naan flavored with minced garlic and cilantro', price: 75, type: 'veg', category: 'Breads' },
  { id: 'b3', name: 'Tandoori Roti', desc: 'Whole wheat bread', price: 30, type: 'veg', category: 'Breads' },
  { id: 'b4', name: 'Lachha Paratha', desc: 'Multi-layered flaky whole wheat bread', price: 70, type: 'veg', category: 'Breads' },

  // Rice & Biryani
  { id: 'r1', name: 'Jeera Rice', desc: 'Basmati rice tossed with cumin seeds', price: 160, type: 'veg', category: 'Rice/Biryani' },
  { id: 'r2', name: 'Veg Dum Biryani', desc: 'Fragrant rice layered with mixed vegetables', price: 280, type: 'veg', category: 'Rice/Biryani' },
  { id: 'r3', name: 'Chicken Dum Biryani', desc: 'Classic Hyderabadi style slow-cooked chicken biryani', price: 380, type: 'non-veg', category: 'Rice/Biryani' },
  { id: 'r4', name: 'Mutton Biryani', desc: 'Spicy and flavorful lamb and rice preparation', price: 460, type: 'non-veg', category: 'Rice/Biryani' },

  // Desserts
  { id: 'd1', name: 'Gulab Jamun', desc: 'Deep-fried milk dumplings in sugar syrup (2 pcs)', price: 90, type: 'veg', category: 'Desserts' },
  { id: 'd2', name: 'Rasmalai', desc: 'Cottage cheese dumplings in sweetened thick milk', price: 120, type: 'veg', category: 'Desserts' },
  { id: 'd3', name: 'Moong Dal Halwa', desc: 'Rich lentil pudding cooked in ghee', price: 140, type: 'veg', category: 'Desserts' },

  // Beverages
  { id: 'bev1', name: 'Sweet Lassi', desc: 'Traditional churned yogurt drink', price: 80, type: 'veg', category: 'Beverages' },
  { id: 'bev2', name: 'Fresh Lime Soda', desc: 'Sweet or salted', price: 70, type: 'veg', category: 'Beverages' },
  { id: 'bev3', name: 'Masala Chaas', desc: 'Spiced buttermilk', price: 60, type: 'veg', category: 'Beverages' },
];

const categories = ['Starters', 'Main Veg', 'Main Non-Veg', 'Breads', 'Rice/Biryani', 'Desserts', 'Beverages'];
const filters = ['All', 'Veg', 'Non-Veg'];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredMenu = menuData.filter(item => {
    const matchCategory = item.category === activeCategory;
    const matchFilter = 
      activeFilter === 'All' ? true : 
      activeFilter === 'Veg' ? item.type === 'veg' : 
      item.type === 'non-veg';
    return matchCategory && matchFilter;
  });

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Our Menu</h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Prepared fresh daily using authentic recipes and premium ingredients.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <div className="bg-white p-1.5 rounded-full shadow-sm border border-border inline-flex">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-colors",
                  activeFilter === filter 
                    ? "bg-primary text-white" 
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar justify-start md:justify-center border-b border-border">
          <div className="flex gap-6 px-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "whitespace-nowrap pb-4 text-lg font-serif font-medium transition-all relative",
                  activeCategory === category 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {category}
                {activeCategory === category && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory + activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredMenu.length > 0 ? (
                filteredMenu.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {/* Veg/Non-veg indicator */}
                          <div className={cn(
                            "w-4 h-4 border-2 flex items-center justify-center shrink-0",
                            item.type === 'veg' ? "border-green-600" : "border-red-600"
                          )}>
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              item.type === 'veg' ? "bg-green-600" : "bg-red-600"
                            )} />
                          </div>
                          <h3 className="text-xl font-bold text-foreground font-serif">{item.name}</h3>
                        </div>
                        <span className="text-xl font-bold text-primary font-serif shrink-0">₹{item.price}</span>
                      </div>
                      <p className="text-muted-foreground text-sm ml-6 line-clamp-2">{item.desc}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 text-center py-12">
                  <p className="text-muted-foreground text-lg">No items found matching the selected filters.</p>
                  <button 
                    onClick={() => setActiveFilter('All')}
                    className="mt-4 text-primary font-medium hover:underline"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
