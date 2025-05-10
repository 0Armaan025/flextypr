interface Props {
    title: string;
    description: string;
    lucideIcon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const FeatureField: React.FC<Props> = ({ title, description, lucideIcon: LucideIcon }) => {
    return (
        <div className="bg-gray-800 p-4 text-white mx-4 rounded-lg mt-8 cursor-pointer hover:bg-gray-600 transition-all duration-200 hover:shadow-lg  ">
            <LucideIcon />
            <h1 className="font-semibold">{title}</h1>
            <p>{description}</p>
        </div>
    );
}