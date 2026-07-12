import * as TrainData from "../data/trains";

console.log(TrainData);
function PopularTrains() {
  /*const trains = [
    { number: "22436", name: "Vande Bharat" },
    { number: "12951", name: "Rajdhani" },
    { number: "12002", name: "Shatabdi" },
    { number: "12213", name: "Duronto" },
  ];*/

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">
        Popular Trains
      </h2>

      <div className="grid grid-cols-2 gap-4">
       {TrainData.trains.slice(0, 4).map((train) => (
          <div
            key={train.number}
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-lg hover:scale-105 transition"
          >
            <p className="text-sm opacity-80">{train.number}</p>

            <p className="font-bold text-lg mt-1">
              {train.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularTrains;