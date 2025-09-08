function HowItWorksCard({title, description, icon}) {
    return (
        <div className="rounded-lg relative group hover:shadow-xl transition-all duration-300 border border-blue-100 shadow-lg shadow-blue-100 bg-white text-card-foreground h-full">
            <div className="p-4 xl:p-5 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-600 transition-colors duration-300 mt-4 text-blue-600 group-hover:text-white">
                    {icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-600 leading-relaxed">
                    {description}
                </p>

            </div>
        </div>
    );
}

export default HowItWorksCard;