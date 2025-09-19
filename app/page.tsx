'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, RefreshCw, Sun, Moon, Zap, ZapOff } from 'lucide-react';

const Dashboard = () => {
  const [currentTeam, setCurrentTeam] = useState('slowmo');
  const [pitLogs, setPitLogs] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [colorTheme, setColorTheme] = useState('blue');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTeams(['slowmo', 'slowmo2', 'slowmo3']);
    setPitLogs([
      {
        id: '1',
        date: '2025-01-19',
        time: '15:42:33',
        driver_id: 'iracing_123456',
        driver_name: 'Max Verstappen',
        team_name: 'SMe Slowmo Racing',
        car_name: 'BMW M4 GT3',
        track: 'Spa-Francorchamps',
        track_config: 'Grand Prix',
        session_type: 'Race',
        in_lap: '01:23.456',
        pit_stop_time: '00:28.123',
        out_lap: '01:25.789',
        fuel_before_l: 35.500,
        fuel_added_l: 20.000,
        fuel_after_l: 55.500,
        fuel_used_after_l: 2.350,
        laps_with_fuel: 8.5,
        tire_change: true,
        tire_compound: 'Soft',
        team_slug: 'slowmo'
      },
      {
        id: '2',
        date: '2025-01-19',
        time: '15:38:21',
        driver_id: 'iracing_789012',
        driver_name: 'Anna Schmidt',
        team_name: 'SMe Slowmo Racing',
        car_name: 'Porsche 911 GT3 R',
        track: 'Nürburgring GP',
        track_config: 'Grand Prix',
        session_type: 'Qualifying',
        in_lap: '01:18.234',
        pit_stop_time: '00:32.567',
        out_lap: '01:20.123',
        fuel_before_l: 25.000,
        fuel_added_l: 15.500,
        fuel_after_l: 40.500,
        fuel_used_after_l: 1.890,
        laps_with_fuel: 12.3,
        tire_change: false,
        tire_compound: 'Medium',
        team_slug: 'slowmo'
      }
    ]);
  }, []);

  const loadPitLogs = async () => {
    setIsLoading(true);
    try {
      // API Call würde hier hin
      setTimeout(() => setIsLoading(false), 500);
    } catch (error) {
      console.error('Fehler beim Laden:', error);
      setIsLoading(false);
    }
  };

  const deletePitLog = async (id) => {
    try {
      setPitLogs(logs => logs.filter(log => log.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const formatTime = (timeStr) => {
    return timeStr || '--:--.---';
  };

  const getTireIcon = (compound) => {
    switch(compound?.toLowerCase()) {
      case 'soft': return '🟥'; // Rot für Soft
      case 'medium': return '🟨'; // Gelb für Medium  
      case 'hard': return '⚪'; // Weiß für Hard
      case 'wet': return '🔵'; // Blau für Wet
      case 'intermediate': return '🟢'; // Grün für Inter
      default: return '⚫'; // Schwarz für Unbekannt
    }
  };

  const StatCard = ({ title, value, unit = '' }) => (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4">
      <p className="text-sm text-blue-400 mb-1">{title}</p>
      <p className="text-2xl font-bold text-blue-500">{value}<span className="text-sm text-blue-400 ml-1">{unit}</span></p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <img 
              src="https://i.ibb.co/YhHtxmr/SMe-Logo-Blau-Setup-Cover-1280x720.png" 
              alt="SMe Logo" 
              className="h-auto"
              style={{width: '120px'}}
            />
            
            <div className="flex flex-col items-center">
              <img 
                src="https://i.ibb.co/fdJjKcM7/SMe-Sport-blau-weiss.png" 
                alt="SMe Sport Logo" 
                className="mb-2"
                style={{width: '400px', height: 'auto'}}
              />
              <h1 className="text-2xl font-bold text-blue-500">SMePit Dashboard</h1>
              <p className="text-sm text-blue-400">Team: {currentTeam}</p>
            </div>
            
            <img 
              src="https://i.ibb.co/YhHtxmr/SMe-Logo-Blau-Setup-Cover-1280x720.png" 
              alt="SMe Logo" 
              className="h-auto"
              style={{width: '120px'}}
            />
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-4">
            <select
              value={colorTheme}
              onChange={(e) => setColorTheme(e.target.value)}
              className="bg-slate-800 text-white border-slate-600 border rounded-lg px-3 py-2 text-sm"
            >
              <option value="blue">Blau</option>
              <option value="green">Grün</option>
              <option value="purple">Violet</option>
              <option value="orange">Orange</option>
            </select>

            <button
              onClick={loadPitLogs}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-slate-800 text-yellow-400 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex gap-3">
            {teams.map((team) => (
              <button
                key={team}
                onClick={() => setCurrentTeam(team)}
                className="px-6 py-3 rounded-xl font-medium transition-all bg-blue-600 text-white shadow-lg hover:bg-blue-700"
              >
                {team}
              </button>
            ))}
          </div>
        </div>

        {/* Statistik-Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Durchschn. Pit-Zeit" value="30.3" unit="s" />
          <StatCard title="Schnellste Pit-Zeit" value="28.1" unit="s" />
          <StatCard title="Gesamt Stops" value={pitLogs.length} />
          <StatCard title="Reifenwechsel" value="67%" />
        </div>

        {/* Haupttabelle */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-blue-500">Detailliertes Pit-Stop Protokoll</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Datum</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Zeit</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Fahrer ID</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Fahrer</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Team</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Fahrzeug</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Strecke</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Config</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Session</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">InLap</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Pit-Zeit</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">OutLap</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Kraftstoff</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Verbrauch</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Reichweite</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Reifen</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-blue-400">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {pitLogs.map((log) => (
                  <tr key={log.id} className="border-t border-slate-700 hover:bg-slate-700/30 transition-colors">
                    <td className="px-3 py-3 text-blue-400">{log.date}</td>
                    <td className="px-3 py-3 text-blue-400">{log.time}</td>
                    <td className="px-3 py-3 text-blue-400 font-mono text-xs">{log.driver_id}</td>
                    <td className="px-3 py-3 text-blue-500 font-medium">{log.driver_name}</td>
                    <td className="px-3 py-3 text-blue-400">{log.team_name}</td>
                    <td className="px-3 py-3 text-blue-400">{log.car_name}</td>
                    <td className="px-3 py-3 text-blue-400">{log.track}</td>
                    <td className="px-3 py-3 text-blue-400">{log.track_config}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.session_type === 'Race' ? 'bg-red-500/20 text-red-400' :
                        log.session_type === 'Qualifying' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {log.session_type}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-blue-500 font-mono">{formatTime(log.in_lap)}</td>
                    <td className="px-3 py-3 text-blue-500 font-mono font-bold">{formatTime(log.pit_stop_time)}</td>
                    <td className="px-3 py-3 text-blue-500 font-mono">{formatTime(log.out_lap)}</td>
                    <td className="px-3 py-3 text-blue-400">
                      <div className="text-xs">
                        <div>+{log.fuel_added_l}L</div>
                        <div className="opacity-70">{log.fuel_before_l}L → {log.fuel_after_l}L</div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-blue-400 text-xs">{log.fuel_used_after_l}L</td>
                    <td className="px-3 py-3 text-blue-400 text-xs">{log.laps_with_fuel} Runden</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        {log.tire_change ? (
                          <Zap className="w-4 h-4 text-green-400" title="Reifen gewechselt" />
                        ) : (
                          <ZapOff className="w-4 h-4 text-gray-500" title="Reifen behalten" />
                        )}
                        <span className="text-lg" title={log.tire_compound}>
                          {getTireIcon(log.tire_compound)}
                        </span>
                        <span className="text-xs text-blue-400">{log.tire_compound}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => deletePitLog(log.id)}
                        className="p-1 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                        title="Eintrag löschen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pitLogs.length === 0 && (
            <div className="px-6 py-12 text-center text-blue-400">
              Keine Pit-Stop-Daten für Team "{currentTeam}" vorhanden.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;