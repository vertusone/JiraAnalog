import { format, subHours, startOfMonth } from "date-fns";
import {
  MonthlyBody,
  MonthlyDay,
  MonthlyCalendar,
  MonthlyNav,
  DefaultMonthlyEventItem,
} from "@zach.codes/react-calendar";
import { useState } from "react";
import "@zach.codes/react-calendar/dist/calendar-tailwind.css";

import { MainLayout } from "../../components/MainLayout";

export default function Calendar({ jobs }) {
  let [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );

  return (
    <MainLayout>
      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={(date) => setCurrentMonth(date)}
      >
        <MonthlyNav />
        <MonthlyBody
          events={jobs.map((x) => ({
            title: x.name,
            date: new Date(x.deadline),
          }))}
        >
          <MonthlyDay<EventType>
            renderDay={(data) =>
              data.map((item, index) => (
                <DefaultMonthlyEventItem
                  key={index}
                  title={item.title}
                  // Format the date here to be in the format you prefer
                  date={format(item.date, "h:mm aa")}
                />
              ))
            }
          />
        </MonthlyBody>
      </MonthlyCalendar>
    </MainLayout>
  );
}

Calendar.getInitialProps = async () => {
  const responce = await fetch("http://localhost:5000/api/job/");
  const jobs = await responce.json();

  return {
    jobs,
  };
};
