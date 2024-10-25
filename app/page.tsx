"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import Hero from "./Hero/page"

// Move interfaces outside of component
interface Device {
  id: number;
  name: string;
  defaultPower: number;
  defaultHours: number;
  power?: number;
  hoursPerDay?: number;
}

// Common devices data
const commonDevices: Device[] = [
  { id: 1, name: "Lodówka", defaultPower: 150, defaultHours: 24 },
  { id: 2, name: "Telewizor", defaultPower: 100, defaultHours: 4 },
  { id: 3, name: "Pralka", defaultPower: 2000, defaultHours: 2 },
  { id: 4, name: "Zmywarka", defaultPower: 1800, defaultHours: 1.5 },
  { id: 5, name: "Mikrofalówka", defaultPower: 800, defaultHours: 0.5 },
  { id: 6, name: "Piekarnik", defaultPower: 2400, defaultHours: 1 },
  { id: 7, name: "Czajnik elektryczny", defaultPower: 2200, defaultHours: 0.5 },
  { id: 8, name: "Komputer", defaultPower: 400, defaultHours: 8 },
  { id: 9, name: "Odkurzacz", defaultPower: 1600, defaultHours: 0.5 },
  { id: 10, name: "Klimatyzator", defaultPower: 2500, defaultHours: 6 },
];

const PowerCalculator = () => {
  // Initialize state with default values
  const [isLoading, setIsLoading] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);
  const [customDevices, setCustomDevices] = useState<Device[]>([]);
  const [energyPrice, setEnergyPrice] = useState(1.22);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [customPower, setCustomPower] = useState("");
  const [customHours, setCustomHours] = useState("");
  const [isCustomDevice, setIsCustomDevice] = useState(false);
  const [customDeviceName, setCustomDeviceName] = useState("");
  const [chartWidth, setChartWidth] = useState(400);
  const [chartHeight, setChartHeight] = useState(400);

  const handleResize = () => {
    setChartWidth(window.innerWidth < 640 ? 300 : 400);
    setChartHeight(400);
  };


  // Consolidate localStorage logic in a single useEffect
  
  // Consolidate localStorage logic in a single useEffect
  useEffect(() => {
    const loadInitialData = () => {
      try {
        const savedDevices = localStorage.getItem("powerCalculatorDevices");
        const savedPrice = localStorage.getItem("energyPrice");
        const savedCustomDevices = localStorage.getItem("customDevices");

        if (savedDevices) {
          setDevices(JSON.parse(savedDevices));
        } else {
          setDevices([
            { id: 1, name: "Lodówka", power: 150, hoursPerDay: 24, defaultPower: 150, defaultHours: 24 },
            { id: 2, name: "Telewizor", power: 100, hoursPerDay: 4, defaultPower: 100, defaultHours: 4 },
            { id: 3, name: "Pralka", power: 2000, hoursPerDay: 2, defaultPower: 2000, defaultHours: 2 },
          ]);
        }

        if (savedPrice) {
          setEnergyPrice(parseFloat(savedPrice));
        }

        if (savedCustomDevices) {
          setCustomDevices(JSON.parse(savedCustomDevices));
        }

        handleResize(); // Now this will work as handleResize is defined
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);


  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth < 640 ? 300 : 400);
      setChartHeight(400);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("powerCalculatorDevices", JSON.stringify(devices));
      localStorage.setItem("energyPrice", energyPrice.toString());
      localStorage.setItem("customDevices", JSON.stringify(customDevices));
    }
  }, [devices, energyPrice, customDevices, isLoading]);

  // Utility functions
  const generateUniqueId = (): number => {
    return Math.floor(Math.random() * 1000000);
  };

  const calculateDeviceKWh = (device: Device): number => {
    return ((device.power || 0) * (device.hoursPerDay || 0)) / 1000;
  };

  const calculateDeviceCost = (device: Device): number => {
    return calculateDeviceKWh(device) * energyPrice;
  };

  // Event handlers
  const addCustomDeviceToLibrary = () => {
    if (customDeviceName && customPower) {
      const newCustomDevice: Device = {
        id: generateUniqueId(),
        name: customDeviceName,
        defaultPower: Number(customPower),
        defaultHours: parseFloat(customHours) || 1,
      };
      setCustomDevices(prev => [...prev, newCustomDevice]);
      addDeviceToList(newCustomDevice);
      setCustomDeviceName("");
      setIsCustomDevice(false);
    }
  };

  const addDeviceToList = (device: Device) => {
    const newDevice: Device = {
      id: generateUniqueId(),
      name: device.name,
      power: parseInt(customPower) || device.defaultPower,
      hoursPerDay: parseFloat(customHours) || device.defaultHours,
      defaultPower: device.defaultPower,
      defaultHours: device.defaultHours,
    };

    setDevices(prev => [...prev, newDevice]);
    setSelectedDevice("");
    setCustomPower("");
    setCustomHours("");
  };

  const addDevice = () => {
    if (isCustomDevice) {
      if (customDeviceName?.trim() && customPower) {
        addCustomDeviceToLibrary();
      }
    } else if (selectedDevice) {
      const device = [...commonDevices, ...customDevices].find(
        d => d.name === selectedDevice
      );
      if (device) {
        addDeviceToList(device);
      }
    }
  };

  const removeDevice = (id: number) => {
    setDevices(prev => prev.filter(device => device.id !== id));
  };

  const updatePower = (id: number, newPower: string) => {
    setDevices(prev =>
      prev.map(device =>
        device.id === id
          ? { ...device, power: parseInt(newPower) || 0 }
          : device
      )
    );
  };

  const updateHours = (id: number, newHours: string) => {
    setDevices(prev =>
      prev.map(device =>
        device.id === id
          ? { ...device, hoursPerDay: parseFloat(newHours) || 0 }
          : device
      )
    );
  };

  // Calculations
  const dailyKWh = devices.reduce(
    (sum, device) => sum + calculateDeviceKWh(device),
    0
  );
  const dailyCost = dailyKWh * energyPrice;
  const monthlyCost = dailyCost * 30;
  const yearlyCost = dailyCost * 365;

  // Chart data
  const chartData = devices.map(device => ({
    name: device.name,
    "Zużycie dzienne (kWh)": calculateDeviceKWh(device),
    "Koszt dzienny (PLN)": calculateDeviceCost(device),
  }));

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <>
 <Hero />
      <div className="w-full p-6">
        <div className="bg-green-300 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Kalkulator zużycia energii</h1>

          {/* Energy Price Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cena energii (PLN/kWh)
            </label>
            <input
              type="number"
              value={energyPrice}
              onChange={(e) => setEnergyPrice(parseFloat(e.target.value) || 0)}
              step="0.01"
              min="0"
              className="w-full sm:w-32 p-2 border rounded"
            />
          </div>

          {/* Custom Device Checkbox */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isCustomDevice}
                onChange={(e) => setIsCustomDevice(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2">Dodaj własne urządzenie</span>
            </label>
          </div>

          {/* Device Input Form */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {isCustomDevice ? (
              <input
                type="text"
                value={customDeviceName}
                onChange={(e) => setCustomDeviceName(e.target.value)}
                placeholder="Nazwa urządzenia"
                className="flex-1 p-2 border rounded"
              />
            ) : (
              <select
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
                className="flex-1 p-2 border rounded"
              >
                <option value="">Wybierz urządzenie</option>
                <optgroup label="Popularne urządzenia">
                  {commonDevices.map((device) => (
                    <option key={device.id} value={device.name}>
                      {device.name} ({device.defaultPower}W, {device.defaultHours}
                      h/dzień)
                    </option>
                  ))}
                </optgroup>
                {customDevices.length > 0 && (
                  <optgroup label="Własne urządzenia">
                    {customDevices.map((device) => (
                      <option key={device.id} value={device.name}>
                        {device.name} ({device.defaultPower}W,{" "}
                        {device.defaultHours}h/dzień)
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            )}
            <input
              type="number"
              value={customPower}
              onChange={(e) => setCustomPower(e.target.value)}
              placeholder="Moc (W)"
              className="w-full sm:w-32 p-2 border rounded"
            />
            <input
              type="number"
              value={customHours}
              onChange={(e) => setCustomHours(e.target.value)}
              placeholder="Godzin/dzień"
              step="0.5"
              min="0"
              max="24"
              className="w-full sm:w-32 p-2 border rounded"
            />
            <button
              onClick={addDevice}
              disabled={
                isCustomDevice
                  ? !customDeviceName?.trim() || !customPower
                  : !selectedDevice
              }
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 disabled:bg-blue-300"
            >
              <Plus size={20} />
              Dodaj
            </button>
          </div>

          {/* Device List */}
          <div className="space-y-4 mb-6">
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex flex-col sm:flex-row items-center gap-8 p-4 bg-gray-50 rounded"
              >
                <span className="flex-1 font-medium">{device.name}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={device.power}
                    onChange={(e) => updatePower(device.id, e.target.value)}
                    className="w-32 p-2 border rounded"
                  />
                  <span className="text-gray-500">W</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={device.hoursPerDay}
                    onChange={(e) => updateHours(device.id, e.target.value)}
                    step="0.5"
                    min="0"
                    max="24"
                    className="w-24 p-2 border rounded"
                  />
                  <span className="text-gray-500">H</span>
                </div>
                <div className="text-sm text-gray-500 w-24">
                  {calculateDeviceKWh(device).toFixed(2)} kWh/dzień
                </div>
                <div className="text-sm text-gray-500 w-24">
                  {calculateDeviceCost(device).toFixed(2)} PLN/dzień
                </div>
                <button
                  onClick={() => removeDevice(device.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-bold text-blue-900 mb-2">
              Podsumowanie zużycia
            </h2>
            <div className="space-y-2">
              <p className=" flex row text-blue-800">
                Dzienne zużycie: {dailyKWh.toFixed(2)} kWh
              
              </p>
              <p>
              </p>
              <p className="text-blue-800">
                Dzienny koszt: {dailyCost.toFixed(2)} PLN
              </p>
              <p className="text-blue-800 font-bold">
                Miesięczny koszt: {monthlyCost.toFixed(2)} PLN
              </p>
              <p className="text-blue-800 font-bold">
                Roczny koszt: {yearlyCost.toFixed(2)} PLN
              </p>
              {dailyKWh > 0 && (
                  <span>
                    Proponowany bank energii o pojemności:{" "}
                    {Math.min(Math.floor(dailyKWh) * 1000 + 500, 20000)}Ah
                  </span>
                )}
            </div>
          </div>



          <div className="bg-white p-4 rounded-lg">
  <h2 className="text-xl font-bold mb-4">Wykres zużycia energii</h2>
  {devices.length > 0 ? ( // Check if there are devices
    <BarChart
      width={chartWidth} // Use state variable for width
      height={chartHeight} // Use state variable for height
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
      <Tooltip />
      <Legend />
      <Bar
        yAxisId="left"
        dataKey="Zużycie dzienne (kWh)"
        fill="#8884d8"
      />
      <Bar
        yAxisId="right"
        dataKey="Koszt dzienny (PLN)"
        fill="#82ca9d"
      />
    </BarChart>
  ) : (
    <p className="text-gray-500">Brak urządzeń do wyświetlenia wykresu.</p> // Optional message when no devices
  )}
</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PowerCalculator;
