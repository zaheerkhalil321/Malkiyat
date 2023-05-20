import { PropertyI } from "../services/model";
import PropertyIcon from "../assets/images/Area.svg";
import QeematIcon from "../assets/images/Qeemat.svg";
import SqIcon from "../assets/images/Sq.svg";
import ResFileIcon from "../assets/images/ResFile.svg";
import MapIcon from "../assets/images/Map.svg";
import HistoryIcon from "../assets/images/History.svg";
import DocumentIcon from "../assets/images/Document.svg";
import SellIcon from "../assets/images/sell.svg";
import { store } from "../redux";
import { SvgProps } from "react-native-svg";

export interface DataSetI {
  readonly id: Required<number>;
  title: string;
  image: React.FC<SvgProps>;
}

const PropertyAmount: DataSetI[] = [
  {
    id: 1,
    title: "Property Area",
    image: PropertyIcon,
  },
  {
    id: 2,
    title: "Property ki Qeemat",
    image: QeematIcon,
  },
  {
    id: 3,
    title: "1 Sqft ki Qeemat",
    image: SqIcon,
  },
];

const PropertyTabData: Partial<DataSetI> & { screenName: string }[] = [
  {
    id: 1,
    title: "Property Details",
    image: ResFileIcon,
    screenName: "PropertyFurtherDetail",
  },
  {
    id: 2,
    title: "Location",
    image: MapIcon,
    screenName: "Location",
  },
  {
    id: 3,
    title: "Sqft Sold History",
    image: HistoryIcon,
    screenName: "PropertyHistory",
  },
  {
    id: 4,
    title: "Malkiyat Documents",
    image: DocumentIcon,
    screenName: "MalkiyatDocuments",
  },
  {
    id: 5,
    title: `Sell your \n Sqft`,
    image: SellIcon,
    screenName: "Market",
  },
];

export { PropertyAmount, PropertyTabData };
