import AccordionDemo from "../demos/react/accordion";
import AlertDemo from "../demos/react/alert";
import AlertDialogDemo from "../demos/react/alert-dialog";
import AspectRatioDemo from "../demos/react/aspect-ratio";
import AvatarDemo from "../demos/react/avatar";
import BadgeDemo from "../demos/react/badge";
import BreadcrumbDemo from "../demos/react/breadcrumb";
import ButtonDemo from "../demos/react/button";
import ButtonGroupDemo from "../demos/react/button-group";
import CalendarDemo from "../demos/react/calendar";
import CardDemo from "../demos/react/card";
import CarouselDemo from "../demos/react/carousel";
import ChartDemo from "../demos/react/chart";
import CheckboxDemo from "../demos/react/checkbox";
import CollapsibleDemo from "../demos/react/collapsible";
import ComboboxDemo from "../demos/react/combobox";
import CommandDemo from "../demos/react/command";
import ContextMenuDemo from "../demos/react/context-menu";
import DataTableDemo from "../demos/react/data-table";
import DatePickerDemo from "../demos/react/date-picker";
import DialogDemo from "../demos/react/dialog";
import DrawerDemo from "../demos/react/drawer";
import DropdownMenuDemo from "../demos/react/dropdown-menu";
import EmptyDemo from "../demos/react/empty";
import FieldDemo from "../demos/react/field";
import FormDemo from "../demos/react/form";
import HoverCardDemo from "../demos/react/hover-card";
import InputDemo from "../demos/react/input";
import InputGroupDemo from "../demos/react/input-group";
import InputOtpDemo from "../demos/react/input-otp";
import ItemDemo from "../demos/react/item";
import KbdDemo from "../demos/react/kbd";
import LabelDemo from "../demos/react/label";
import MenubarDemo from "../demos/react/menubar";
import NavigationMenuDemo from "../demos/react/navigation-menu";
import PaginationDemo from "../demos/react/pagination";
import PopoverDemo from "../demos/react/popover";
import ProgressDemo from "../demos/react/progress";
import RadioGroupDemo from "../demos/react/radio-group";
import ResizableDemo from "../demos/react/resizable";
import ScrollAreaDemo from "../demos/react/scroll-area";
import SelectDemo from "../demos/react/select";
import SeparatorDemo from "../demos/react/separator";
import SheetDemo from "../demos/react/sheet";
import SkeletonDemo from "../demos/react/skeleton";
import SliderDemo from "../demos/react/slider";
import SonnerDemo from "../demos/react/sonner";
import SpinnerDemo from "../demos/react/spinner";
import SwitchDemo from "../demos/react/switch";
import TableDemo from "../demos/react/table";
import TabsDemo from "../demos/react/tabs";
import TextareaDemo from "../demos/react/textarea";
import ToggleDemo from "../demos/react/toggle";
import ToggleGroupDemo from "../demos/react/toggle-group";
import TooltipDemo from "../demos/react/tooltip";
import TypographyDemo from "../demos/react/typography";
import SidebarDemo from "../demos/react/sidebar";
import ToastDemo from "../demos/react/toast";
import ReactHookFormDemo from "../demos/react/react-hook-form";

const demos: Record<string, React.ComponentType> = {
  accordion: AccordionDemo,
  alert: AlertDemo,
  "alert-dialog": AlertDialogDemo,
  "aspect-ratio": AspectRatioDemo,
  avatar: AvatarDemo,
  badge: BadgeDemo,
  breadcrumb: BreadcrumbDemo,
  button: ButtonDemo,
  "button-group": ButtonGroupDemo,
  calendar: CalendarDemo,
  card: CardDemo,
  carousel: CarouselDemo,
  chart: ChartDemo,
  checkbox: CheckboxDemo,
  collapsible: CollapsibleDemo,
  combobox: ComboboxDemo,
  command: CommandDemo,
  "context-menu": ContextMenuDemo,
  "data-table": DataTableDemo,
  "date-picker": DatePickerDemo,
  dialog: DialogDemo,
  drawer: DrawerDemo,
  "dropdown-menu": DropdownMenuDemo,
  empty: EmptyDemo,
  field: FieldDemo,
  form: FormDemo,
  "hover-card": HoverCardDemo,
  input: InputDemo,
  "input-group": InputGroupDemo,
  "input-otp": InputOtpDemo,
  item: ItemDemo,
  kbd: KbdDemo,
  label: LabelDemo,
  menubar: MenubarDemo,
  "navigation-menu": NavigationMenuDemo,
  pagination: PaginationDemo,
  popover: PopoverDemo,
  progress: ProgressDemo,
  "radio-group": RadioGroupDemo,
  resizable: ResizableDemo,
  "scroll-area": ScrollAreaDemo,
  select: SelectDemo,
  separator: SeparatorDemo,
  sheet: SheetDemo,
  skeleton: SkeletonDemo,
  slider: SliderDemo,
  sonner: SonnerDemo,
  spinner: SpinnerDemo,
  switch: SwitchDemo,
  table: TableDemo,
  tabs: TabsDemo,
  textarea: TextareaDemo,
  toggle: ToggleDemo,
  "toggle-group": ToggleGroupDemo,
  tooltip: TooltipDemo,
  typography: TypographyDemo,
  sidebar: SidebarDemo,
  toast: ToastDemo,
  "react-hook-form": ReactHookFormDemo,
};

export default function ReactDemoRenderer({ name }: { name: string }) {
  const Demo = demos[name];
  if (!Demo) return <p className="text-muted-foreground">Demo not available.</p>;
  return <Demo />;
}
