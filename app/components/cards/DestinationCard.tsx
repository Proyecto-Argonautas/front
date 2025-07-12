
import { User } from "lucide-react";

interface DestinationCardProps {
  image: string;
  title: string;
  members: number;
  startDate: string;
  endDate: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ image, title, members, startDate, endDate }) => {
  return (
    <div className="w-64  rounded-xl overflow-hidden shadow-md bg-white">
      
      <img src={image} alt={title} className="w-full h-32 object-cover" />
     
      <div className="p-4 text-center">
        
        <div className="flex">
          
            <User className="w-5 h-5 text-gray-600" />
          
            <span className="text-gray-700">{members} {members !== 1 ? '' : ''}</span>
          
          <h2 className="mx-auto text-lg font-semibold text-gray-800">{title}</h2>       
          
                   
            <span>12 d</span>
        </div>

          
        
        <div className="mt-2 text-sm text-gray-500">
          <span>{startDate} - {endDate}</span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;