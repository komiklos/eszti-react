// components/AllCategoriesSkeletonLoader.js
export default function AllCategoriesSkeletonLoader() {
    return (
        <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="group relative block overflow-hidden">
                        {/* Skeleton Thumbnail */}
                        <div className="aspect-ratio-box bg-gray-100 animate-pulse">
                            <div className="absolute top-0 left-0 w-full h-full"></div>
                        </div>

                        {/* Skeleton Title */}
                        <div className="w-3/4 h-6 bg-gray-100 animate-pulse mt-2"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
