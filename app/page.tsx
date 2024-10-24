"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Package } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const PowerCalculator = () => {
  interface Device {
    id: number;
    name: string;
    defaultPower: number;
    defaultHours: number;
    power?: number;
    hoursPerDay?: number;
  }

  interface DeviceType extends Device {
    // Extend DeviceType to include Device properties
    id: number; // Example property
    name: string; // Example property
    // Add other properties as needed
  }

  const [devices, setDevices] = useState<Device[]>(() => {
    if (typeof window !== "undefined") {
      // Check if running in the browser
      const savedDevices = localStorage.getItem("powerCalculatorDevices");
      return savedDevices
        ? JSON.parse(savedDevices)
        : [
            { id: 1, name: "Lodówka", power: 150, hoursPerDay: 24 },
            { id: 2, name: "Telewizor", power: 100, hoursPerDay: 4 },
            { id: 3, name: "Pralka", power: 2000, hoursPerDay: 2 },
          ];
    }
    return []; // Return an empty array if not in the browser
  });

  const [selectedDevice, setSelectedDevice] = useState("");
  const [customPower, setCustomPower] = useState("");
  const [customHours, setCustomHours] = useState("");
  const [energyPrice, setEnergyPrice] = useState(() => {
    if (typeof window !== "undefined") {
      const savedPrice = localStorage.getItem("energyPrice");
      return savedPrice ? parseFloat(savedPrice) : 0.85;
    }
    return 0.85; // Default value if not in the browser
  });
  // Function to remove a custom device
  const removeCustomDevice = (name: string) => {
    setCustomDevices(customDevices.filter((device) => device.name !== name));
  };

  const [isCustomDevice, setIsCustomDevice] = useState(false);
  const [customDeviceName, setCustomDeviceName] = useState("");

  const [customDevices, setCustomDevices] = useState<Device[]>(() => {
    if (typeof window !== "undefined") {
      const savedCustomDevices = localStorage.getItem("customDevices");
      return savedCustomDevices ? JSON.parse(savedCustomDevices) : [];
    }
    return []; // Return an empty array if not in the browser
  });

  const commonDevices = [
    { name: "Lodówka", defaultPower: 150, defaultHours: 24 },
    { name: "Telewizor", defaultPower: 100, defaultHours: 4 },
    { name: "Pralka", defaultPower: 2000, defaultHours: 2 },
    { name: "Zmywarka", defaultPower: 1800, defaultHours: 1.5 },
    { name: "Mikrofalówka", defaultPower: 800, defaultHours: 0.5 },
    { name: "Piekarnik", defaultPower: 2400, defaultHours: 1 },
    { name: "Czajnik elektryczny", defaultPower: 2200, defaultHours: 0.5 },
    { name: "Komputer", defaultPower: 400, defaultHours: 8 },
    { name: "Odkurzacz", defaultPower: 1600, defaultHours: 0.5 },
    { name: "Klimatyzator", defaultPower: 2500, defaultHours: 6 },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if running in the browser
      localStorage.setItem("powerCalculatorDevices", JSON.stringify(devices));
    }
  }, [devices]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if running in the browser
      localStorage.setItem("energyPrice", energyPrice.toString());
    }
  }, [energyPrice]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if running in the browser
      localStorage.setItem("customDevices", JSON.stringify(customDevices));
    }
  }, [customDevices]);

  function generateUniqueId(): string {
    return "id-" + Math.random().toString(36).substr(2, 9); // Example implementation
  }

  const addCustomDeviceToLibrary = () => {
    if (customDeviceName && customPower) {
      const newCustomDevice: Device = {
        id: Number(generateUniqueId()),
        name: customDeviceName,
        defaultPower: Number(customPower) || 0,
        defaultHours: parseFloat(customHours) || 1,
      };
      setCustomDevices([...customDevices, newCustomDevice]);
      addDeviceToList(newCustomDevice);
      setCustomDeviceName("");
      setIsCustomDevice(false);
    }
  };

  const addDeviceToList = (device: Device) => {
    const newDevice: Device = {
      id: Math.max(...devices.map((d) => d.id), 0) + 1,
      name: device.name,
      power: parseInt(customPower) || device.defaultPower, // Use parsed customPower or defaultPower
      hoursPerDay: parseFloat(customHours) || device.defaultHours, // Use parsed customHours or defaultHours
      defaultPower: device.defaultPower || 0, // Provide a default value if necessary
      defaultHours: device.defaultHours || 0, // Provide a default value if necessary
    };

    setDevices((prevDevices) => [...prevDevices, newDevice]);

    setSelectedDevice("");
    setCustomPower("");
    setCustomHours("");
  };

  const addDevice = () => {
    if (isCustomDevice) {
      if (customDeviceName && customPower) {
        addCustomDeviceToLibrary();
      }
    } else if (selectedDevice) {
      const device = [...commonDevices, ...customDevices].find(
        (d) => d.name === selectedDevice
      );
      if (device) {
        const deviceWithId = { ...device, id: Number(generateUniqueId()) }; // Convert to number
        addDeviceToList(deviceWithId);
      }
    }
  };

  const removeDevice = (id: number) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  const updatePower = (id: number, newPower: string) => {
    setDevices(
      devices.map((device) =>
        device.id === id
          ? { ...device, power: parseInt(newPower) || 0 }
          : device
      )
    );
  };

  const updateHours = (id: number, newHours: string) => {
    setDevices(
      devices.map((device) =>
        device.id === id
          ? { ...device, hoursPerDay: parseFloat(newHours) || 0 }
          : device
      )
    );
  };

  const calculateDeviceKWh = (device: Device) => {
    if (device.power === undefined) {
      return 0; // or handle the case as needed
    }
    return (device.power * (device.hoursPerDay ?? 0)) / 1000;
  };

  const calculateDeviceCost = (device: DeviceType) => {
    // Specify the type of device
    return calculateDeviceKWh(device) * energyPrice;
  };

  const dailyKWh = devices.reduce(
    (sum, device) => sum + calculateDeviceKWh(device),
    0
  );
  const dailyCost = dailyKWh * energyPrice;
  const monthlyCost = dailyCost * 30;
  const yearlyCost = dailyCost * 365;

  const chartData = devices.map((device) => ({
    name: device.name,
    "Zużycie dzienne (kWh)": calculateDeviceKWh(device),
    "Koszt dzienny (PLN)": calculateDeviceCost(device),
  }));

  return (
    <div className="max-w-full mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Kalkulator zużycia energii</h1>

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
                  <option key={device.name} value={device.name}>
                    {device.name} ({device.defaultPower}W, {device.defaultHours}
                    h/dzień)
                  </option>
                ))}
              </optgroup>
              {customDevices.length > 0 && (
                <optgroup label="Własne urządzenia">
                  {customDevices.map((device) => (
                    <option key={device.name} value={device.name}>
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
                ? !customDeviceName || !customPower
                : !selectedDevice
            }
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 disabled:bg-blue-300"
          >
            <Plus size={20} />
            Dodaj
          </button>
        </div>

        {customDevices.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              Twoje własne urządzenia:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {customDevices.map((device: Device) => (
                <div
                  key={device.name}
                  className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-gray-500" />
                    <span>{device.name}</span>
                  </div>
                  <button
                    onClick={() => removeCustomDevice(device.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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
            <BarChart
              width={window.innerWidth < 640 ? 300 : 400} // Adjust width based on screen size
              height={window.innerWidth < 640 ? 400 : 400} // Adjust height based on screen size
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerCalculator;
