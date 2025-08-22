import { CATEGORIES } from "../../assets/data/constants"



export default function SearchCategories({ selectedCategory, selectCategory }) {

    return (
        <ul className="flex flex-row items-center justify-center lg:justify-start overflow-x-auto overflow-y-clip gap-2 text-zinc-300 font-bold">
            {
                CATEGORIES.map((category, i) => (
                    <li key={i}>
                        <CategoryButton {...category} selectedCategory={selectedCategory} action={() => selectCategory(category.value)} />
                    </li>
                ))
            }
        </ul>
    )
};

function CategoryButton({ title, value, selectedCategory, action }) {
    return (
        <button 
            className={`rounded-full flex items-center justify-center px-4 md:px-5 lg:px-6 min-w-16 h-8 md:h-10 ${selectedCategory === value ? 'bg-zinc-100 text-black' : 'bg-white/10 hover:bg-white/20 hover:text-zinc-100'}`} 
            onClick={action}
        >
            <span className="text-xs sm:text-sm">{title}</span>
        </button>
    )
};