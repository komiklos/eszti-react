// components/MasonrySkeletonLoader.js
export default function MasonrySkeletonLoader() {
    return (
        <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                {[...Array(9)].map((_, index) => (
                    <div key={index} className="mb-6">
                        {/* Skeleton Thumbnail */}
                        <div className="aspect-ratio-box bg-gray-100 animate-pulse">
                            <div className="absolute top-0 left-0 w-full h-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
