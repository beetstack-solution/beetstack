import React from "react";
import { 
  HiHome, 
  HiUser, 
  HiCog6Tooth, 
  HiBell, 
  HiMagnifyingGlass, 
  HiEnvelope, 
  HiHeart, 
  HiTrash, 
  HiPencil, 
  HiPlus, 
  HiMinus, 
  HiCheck, 
  HiXMark,
  HiChevronRight,
  HiChevronLeft,
  HiChevronUp,
  HiChevronDown,
  HiArrowRightOnRectangle,
  HiBars3,
  HiMoon,
  HiSun,
  HiBriefcase
} from "react-icons/hi2";
import { GrProjects } from "react-icons/gr";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const Icons = {
  Home: (props: IconProps) => <HiHome {...props} />,
  User: (props: IconProps) => <HiUser {...props} />,
  Settings: (props: IconProps) => <HiCog6Tooth {...props} />,
  Bell: (props: IconProps) => <HiBell {...props} />,
  Search: (props: IconProps) => <HiMagnifyingGlass {...props} />,
  Mail: (props: IconProps) => <HiEnvelope {...props} />,
  Heart: (props: IconProps) => <HiHeart {...props} />,
  Trash: (props: IconProps) => <HiTrash {...props} />,
  Pencil: (props: IconProps) => <HiPencil {...props} />,
  Plus: (props: IconProps) => <HiPlus {...props} />,
  Minus: (props: IconProps) => <HiMinus {...props} />,
  Check: (props: IconProps) => <HiCheck {...props} />,
  Close: (props: IconProps) => <HiXMark {...props} />,
  ChevronRight: (props: IconProps) => <HiChevronRight {...props} />,
  ChevronLeft: (props: IconProps) => <HiChevronLeft {...props} />,
  ChevronUp: (props: IconProps) => <HiChevronUp {...props} />,
  ChevronDown: (props: IconProps) => <HiChevronDown {...props} />,
  Logout: (props: IconProps) => <HiArrowRightOnRectangle {...props} />,
  Menu: (props: IconProps) => <HiBars3 {...props} />,
  Moon: (props: IconProps) => <HiMoon {...props} />,
  Sun: (props: IconProps) => <HiSun {...props} />,
  Briefcase: (props: IconProps) => <HiBriefcase {...props} />,
  Projects: (props: IconProps) => <GrProjects {...props} />,
};

export default Icons;
