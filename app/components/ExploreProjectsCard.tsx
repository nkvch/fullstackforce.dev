import Link from 'next/link';
import './ExploreProjectsCard.css';

const ExploreProjectsCard = () => {
    return (
        <div className="explore-projects-card">
            <h3 className="explore-projects-title">Explore more projects</h3>
            <Link href="/products" className="explore-projects-button">SEE MORE</Link>
        </div>
    );
};

export default ExploreProjectsCard;
