// components/MasonrySkeletonLoader.js
export default function MasonrySkeletonLoader({ hasTitle = false}) {
    return (
        <div className={`mx-8 lg:mx-16 ${hasTitle ? 'mt-20' : 'mt-16'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-8">
                {[...Array(9)].map((_, index) => (
                    <div key={index} >
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
