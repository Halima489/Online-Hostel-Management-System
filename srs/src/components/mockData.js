import {
  LayoutDashboard, BedDouble, UtensilsCrossed, Wallet, Megaphone,
  Wifi, ShieldCheck, Droplets, Zap, Shirt, BookOpen, MoonStar,
} from "lucide-react";

export const HOSTEL = {
  name: "Moonmoon Muslim Girls Hostel",
  address: "Lakhri Para, Shibgonj, Sylhet",
  tagline: "Safe Stay • Better Tomorrow",
};

export const STUDENT = { name: "Halima Begum", id: "2021-114-0457", room: "302-B", roomNo: "302", bed: "B", initials: "HB" };

export const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "room", label: "Room & Seat Info", icon: BedDouble },
  { id: "mess", label: "Mess & Meal Planner", icon: UtensilsCrossed },
  { id: "payments", label: "Payments & Receipts", icon: Wallet },
  { id: "notices", label: "Notices & Complaints", icon: Megaphone },
];

export const ROOM_INFO = [
  ["Room", "302"],
  ["Bed", "B"],
  ["Floor", "3rd floor"],
  ["Room type", "4-seater"],
  ["Allocated since", "1 Feb 2026"],
  ["Monthly seat rent", "৳4,000"],
];

export const ROOMMATES = [
  { bed: "A", name: "Rumana Akter", dept: "Dept. of English", batch: "2021" },
  { bed: "B", name: STUDENT.name, dept: "Dept. of Business Administration", batch: "2021", you: true },
  { bed: "C", name: "Tasnia Jahan", dept: "Dept. of CSE", batch: "2022" },
  { bed: "D", name: "Sabrina Chowdhury", dept: "Dept. of Law", batch: "2022" },
];

export const AMENITIES = [
  { icon: Wifi, label: "Wi-Fi", note: "All floors" },
  { icon: ShieldCheck, label: "Security & CCTV", note: "24/7 coverage" },
  { icon: Droplets, label: "Filtered water", note: "Every floor" },
  { icon: Zap, label: "Backup power", note: "Generator" },
  { icon: Shirt, label: "Laundry area", note: "Rooftop" },
  { icon: BookOpen, label: "Study room", note: "Quiet hours" },
  { icon: MoonStar, label: "Prayer room", note: "Ground floor" },
  { icon: UtensilsCrossed, label: "Dining hall", note: "Three meals daily" },
];

export const ANNOUNCEMENTS = [
  { id: 1, date: "2026-10-29", priority: "High", title: "Water supply maintenance on Saturday", body: "Water will be off from 10:00 AM to 2:00 PM for tank cleaning. Please store water in advance." },
  { id: 2, date: "2026-10-27", priority: "High", title: "October dues reminder", body: "Please clear your October mess bill by 05 Nov. Receipts are available in Payments & Receipts." },
  { id: 3, date: "2026-10-25", priority: "Medium", title: "Routine room inspection on 2 Nov", body: "The warden's team will visit rooms between 4:00 and 6:00 PM. Please keep rooms tidy." },
  { id: 4, date: "2026-10-22", priority: "Medium", title: "November mess menu published", body: "The updated weekly menu is on the dining hall notice board and in the Mess & Meal Planner tab." },
  { id: 5, date: "2026-10-20", priority: "Low", title: "Study room open late during exam weeks", body: "The study room will stay open until 11:00 PM. Please keep noise to a minimum." },
];

export const TRANSACTIONS = [
  { id: "TXN-20261105-DUE", title: "Mess bill: October 2026", date: "2026-10-31", due: "2026-11-05", amount: 3500, method: "Not paid yet", status: "Pending" },
  { id: "TXN-20261003-0198", title: "Mess bill: September 2026", date: "2026-10-03", amount: 3200, method: "bKash", status: "Paid" },
  { id: "TXN-20261001-0142", title: "Seat rent: October 2026", date: "2026-10-01", amount: 4000, method: "Cash", status: "Paid" },
  { id: "TXN-20260905-0231", title: "Mess bill: August 2026", date: "2026-09-05", amount: 3150, method: "Nagad", status: "Paid" },
  { id: "TXN-20260902-0117", title: "Seat rent: September 2026", date: "2026-09-02", amount: 4000, method: "Cash", status: "Paid" },
];

export const MESS_BILL = { month: "October 2026", taken: 70, skipped: 20, rate: 50 };

export const INITIAL_MEALS = [
  { id: "t-b", day: "Today", type: "Breakfast", time: "7:30 – 9:00 AM", menu: "Paratha, mixed vegetables, boiled egg", served: true, skipped: false },
  { id: "t-l", day: "Today", type: "Lunch", time: "1:00 – 2:30 PM", menu: "Rice, chicken curry, dal, salad", served: true, skipped: false },
  { id: "t-d", day: "Today", type: "Dinner", time: "8:00 – 9:30 PM", menu: "Rice, fish curry, dal, vegetable bhaji", served: false, skipped: false },
  { id: "n-b", day: "Tomorrow", type: "Breakfast", time: "7:30 – 9:00 AM", menu: "Ruti, vegetable curry, banana", served: false, skipped: false },
  { id: "n-l", day: "Tomorrow", type: "Lunch", time: "1:00 – 2:30 PM", menu: "Rice, beef curry, dal, salad", served: false, skipped: false },
  { id: "n-d", day: "Tomorrow", type: "Dinner", time: "8:00 – 9:30 PM", menu: "Khichuri, egg curry, pickle", served: false, skipped: false },
];

export const INITIAL_COMPLAINTS = [
  { id: "CMP-1042", date: "2026-10-26", category: "Electrical", priority: "Medium", location: "Room 302-B", subject: "Ceiling fan makes a loud noise", description: "The fan wobbles and rattles on speeds 3 and above.", status: "In Progress" },
  { id: "CMP-1021", date: "2026-10-02", category: "Maintenance", priority: "Low", location: "3rd floor corridor", subject: "Corridor light not working", description: "The light near the stairs has been off for two days.", status: "Resolved" },
];

export const COMPLAINT_CATEGORIES = ["Maintenance", "Electrical", "Plumbing", "Cleanliness", "Mess / Food", "Security", "Other"];
export const ROOM_CHANGE_REASONS = ["Roommate compatibility", "Medical or accessibility need", "Noise or disturbance", "Closer to study or prayer facilities", "Other"];
export const ROOM_CHANGE_PREFS = ["No preference", "Lower floor", "Quieter room", "Fewer roommates"];