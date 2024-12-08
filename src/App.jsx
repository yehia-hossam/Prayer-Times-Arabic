import { useEffect, useState } from "react";
import Prayer from "./component/Prayer";

function App() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [dateTime, setDateTime] = useState("");
  const [city, setCity] = useState("Cairo");

  const citys = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الإسكندرية", value: "Alexandria" },
    { name: "الجيزة", value: "Giza" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "أسوان", value: "Aswan" },
    { name: "الأقصر", value: "Luxor" },
  ];

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt`
        );

        if (response.ok) {
          const data_Prayer = await response.json();
          setPrayerTimes(data_Prayer.data.timings);
          setDateTime(data_Prayer.data.date.gregorian.date);
          console.log(data_Prayer);
        } else {
          console.error("Failed to fetch prayer times:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };
    

    fetchPrayerTimes();
  }, [city]);

  const formatTimes = (time) => {
    if (!time) {
      return "00:00";
    }

    let [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  };


  

  return (
    <section>
      

      <div className="container">
      <div className="title">
            <h1>توقيت الصلاه</h1>
            </div>
        <div className="top-sec">
          <div className="city">
           
          

            <h3>المدينة</h3>
            <select name="city" id="city" onChange={(e) => setCity(e.target.value)}>
              {citys.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>

    


        <Prayer name="الفجر" time={formatTimes(prayerTimes.Fajr)} />
        <Prayer name="الظهر" time={formatTimes(prayerTimes.Dhuhr)} />
        <Prayer name="العصر" time={formatTimes(prayerTimes.Asr)} />
        <Prayer name="المغرب" time={formatTimes(prayerTimes.Maghrib)} />
        <Prayer name="العشاء" time={formatTimes(prayerTimes.Isha)} />


     <div className="title2">
      <h4>ﷺ اللهم صّلِ وسَلّمْ عَلۓِ نَبِيْنَامُحَمد ﷺ </h4>
     </div>
       
      </div>
     
      <footer className="footer">
        <p>Copyright @ 2024 Design & Yehia Hossam</p>

      </footer>
    </section>
  );
}

export default App;
