// components/MasonrySkeletonLoader.js
export default function MasonrySkeletonLoader() {

    return (
        <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                {[...Array(9)].map((_, index) => (
                    <div key={index} className=" break-inside-avoid">
                        {/* Skeleton Thumbnail */}
                        <div className="w-full h-72 2xl:h-64 bg-gray-200 animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
