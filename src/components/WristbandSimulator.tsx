import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  BatteryMedium, 
  Bluetooth, 
  Heart, 
  Zap, 
  Sparkles,
  Volume2,
  Clock
} from "lucide-react";
import { soundManager } from "../utils/audio";

interface WristbandProps {
  isVibrating: boolean;
  onTriggerVibration: () => void;
  onStopVibration: () => void;
  onStartStudy: () => void;
  currentAlertSubject?: string;
  alertTime?: string;
  onSetAlertTime?: (time: string) => void;
  testCountdown?: number | null;
  onStartTestCountdown?: (seconds: number) => void;
  isAutoAlarmEnabled?: boolean;
}

export const WristbandSimulator: React.FC<WristbandProps> = ({
  isVibrating,
  onTriggerVibration,
  onStopVibration,
  onStartStudy,
  currentAlertSubject = "Toán 6",
  alertTime = "19:00",
  onSetAlertTime,
  testCountdown = null,
  onStartTestCountdown,
  isAutoAlarmEnabled = true,
}) => {
  const [liveTime, setLiveTime] = useState<string>(alertTime);
  const [useRealClock, setUseRealClock] = useState<boolean>(true);
  const [dayText, setDayText] = useState<string>("HÔM NAY");
  const [customTimeInput, setCustomTimeInput] = useState<string>(alertTime);

  useEffect(() => {
    setCustomTimeInput(alertTime);
  }, [alertTime]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      if (useRealClock) {
        setLiveTime(`${hours}:${minutes}:${seconds}`);
        const days = ["CHỦ NHẬT", "THỨ 2", "THỨ 3", "THỨ 4", "THỨ 5", "THỨ 6", "THỨ 7"];
        setDayText(`${days[now.getDay()]} · ${hours}:${minutes}`);
      } else {
        setLiveTime(`${alertTime}:00`);
        setDayText(`GIỜ BÁO · ${alertTime}`);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [useRealClock, alertTime]);

  // Quick set preset times
  const handleApplyTime = (timeVal: string) => {
    setCustomTimeInput(timeVal);
    if (onSetAlertTime) {
      onSetAlertTime(timeVal);
    }
  };

  // Quick set current time + 1 minute
  const handleSetCurrentPlusOne = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const target = `${hh}:${mm}`;
    handleApplyTime(target);
  };

  // Handle tactile click on physical crown
  const handleCrownClick = () => {
    soundManager.playClick();
    if (isVibrating) {
      onStopVibration();
    } else {
      onTriggerVibration();
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Visual Strap Top (Textured silicone look) */}
      <div className="w-32 h-14 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-t-2xl shadow-md border-t border-slate-700/60 -mb-3 flex flex-col items-center justify-center space-y-1">
        <div className="w-16 h-1 bg-slate-700/80 rounded-full"></div>
        <div className="w-12 h-0.5 bg-slate-700/40 rounded-full"></div>
      </div>

      {/* Watch Body Outer Frame */}
      <div className="relative">
        {/* Physical Digital Crown on the Right */}
        <button
          onClick={handleCrownClick}
          title="Nút xoay vật lý: Bấm để thử/tắt rung"
          className="cursor-pointer absolute -right-3.5 top-1/2 -translate-y-1/2 z-30 w-3.5 h-12 bg-gradient-to-r from-slate-300 to-slate-400 rounded-r-md shadow-md border border-slate-400 hover:brightness-110 active:scale-95 transition-all flex flex-col justify-between py-1 items-center"
        >
          <span className="w-2 h-0.5 bg-slate-600 rounded-full"></span>
          <span className="w-2 h-0.5 bg-slate-600 rounded-full"></span>
          <span className="w-2 h-0.5 bg-slate-600 rounded-full"></span>
        </button>

        {/* Watch Body Card */}
        <div
          id="watch-simulator-card"
          className={`relative z-10 bg-white rounded-[38px] p-6 sm:p-8 shadow-[0_25px_60px_rgba(38,60,122,0.16)] border border-slate-100 text-center max-w-sm w-full transition-transform duration-300 ${
            isVibrating ? "animate-vibrate" : ""
          }`}
        >
          {/* OLED glow pulse when vibrating */}
          {isVibrating && (
            <div className="absolute inset-0 rounded-[38px] border-4 border-[#6cf0ae] animate-ping pointer-events-none opacity-40" />
          )}

          {/* Watch Face OLED Screen */}
          <div
            onClick={() => {
              soundManager.playClick();
              if (isVibrating) onStopVibration();
            }}
            className={`relative mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-[#0a0f1d] via-[#101930] to-[#1a294f] text-white flex flex-col justify-center items-center select-none overflow-hidden transition-all duration-300 cursor-pointer ${
              isVibrating
                ? "shadow-[0_0_0_10px_rgba(108,240,174,0.35),0_0_35px_rgba(108,240,174,0.5)] border-2 border-[#6cf0ae]"
                : "shadow-[0_0_0_12px_#edf2ff,0_10px_25px_rgba(0,0,0,0.2)] border-2 border-slate-700/60"
            }`}
          >
            {/* Glass Curvature Reflection */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>

            {/* Top Status Bar on Watch Face */}
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-slate-300 mb-1 z-10">
              <span className="flex items-center gap-1 text-[#6cf0ae]">
                <Bluetooth className="w-3 h-3" />
                <span className="text-[9px]">SYNC</span>
              </span>
              <span>·</span>
              <span>{dayText}</span>
              <span>·</span>
              <BatteryMedium className="w-3.5 h-3.5 text-slate-300" />
            </div>

            {/* Big Time Display with subtle glow */}
            <div className="text-4xl sm:text-5xl font-black tracking-tight font-mono text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] z-10">
              {liveTime}
            </div>

            {/* Alert Pill Banner */}
            <div
              className={`mt-3 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-lg flex items-center gap-1.5 transition-all duration-300 z-10 ${
                isVibrating
                  ? "bg-[#6cf0ae] text-[#0d3320] scale-105 animate-pulse shadow-emerald-400/40"
                  : "bg-blue-500/30 text-blue-200 border border-blue-400/40"
              }`}
            >
              <Bell className={`w-3.5 h-3.5 ${isVibrating ? "animate-bounce" : ""}`} />
              <span>Đến giờ ôn {currentAlertSubject}!</span>
            </div>

            {/* Biometric Heart Rate & Vibration Status */}
            <div className="mt-2.5 flex items-center gap-3 text-[10px] text-slate-300 font-medium z-10">
              <span className="flex items-center gap-1 text-rose-400">
                <Heart className="w-3 h-3 fill-rose-500 animate-pulse" />
                <span>72 bpm</span>
              </span>
              <span>·</span>
              {isVibrating ? (
                <span className="text-[#6cf0ae] font-bold animate-pulse flex items-center gap-0.5">
                  <Zap className="w-3 h-3 fill-[#6cf0ae]" /> RUNG NHẸ HAPTIC
                </span>
              ) : (
                <span className="text-slate-400">Chạm để thử rung</span>
              )}
            </div>
          </div>

          {/* Device Caption & Specs */}
          <div className="mt-5">
            <h3 className="text-xl font-extrabold text-[#172033] flex items-center justify-center gap-2">
              <span>Vòng tay StudySync</span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                OLED Haptic
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-[#687387] mt-1 leading-relaxed">
              Mô tơ haptic rung êm ái vào cổ tay khi đến giờ học. Khi cài đặt giờ, vòng tay sẽ <strong>TỰ ĐỘNG RUNG</strong> đúng giờ mà không cần bấm thủ công.
            </p>
          </div>

          {/* Automatic Alarm Trigger Scheduler Box */}
          <div className="mt-4 bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 text-left">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Cài đặt giờ tự động rung</span>
              </div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                isAutoAlarmEnabled
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-slate-200 text-slate-600"
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                Tự động canh giờ
              </span>
            </div>

            {/* Time Input & Presets */}
            <div className="flex items-center gap-2 mb-2">
              <input
                type="time"
                value={customTimeInput}
                onChange={(e) => handleApplyTime(e.target.value)}
                className="bg-white text-slate-900 font-mono font-bold text-sm px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-500 shadow-xs cursor-pointer flex-1"
                title="Chọn giờ bạn muốn vòng tay tự rung"
              />
              <button
                type="button"
                onClick={handleSetCurrentPlusOne}
                className="cursor-pointer text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1.5 rounded-xl transition whitespace-nowrap"
                title="Đặt giờ rung là 1 phút sau để kiểm tra ngay"
              >
                +1 phút nữa
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] mb-3">
              <span className="text-slate-400 font-medium">Gợi ý:</span>
              {["18:30", "19:00", "19:30", "20:00"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleApplyTime(t)}
                  className={`cursor-pointer px-2 py-0.5 rounded-md font-semibold transition ${
                    alertTime === t
                      ? "bg-indigo-600 text-white font-bold"
                      : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Live Auto Status Banner */}
            <div className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              isVibrating
                ? "bg-rose-50 border border-rose-200 text-rose-800 animate-pulse"
                : testCountdown !== null && testCountdown > 0
                ? "bg-amber-50 border border-amber-200 text-amber-900"
                : "bg-emerald-50/80 border border-emerald-200/80 text-emerald-900"
            }`}>
              {isVibrating ? (
                <>
                  <Zap className="w-4 h-4 text-rose-600 animate-bounce shrink-0" />
                  <span>⏰ ĐÚNG GIỜ RỒI! Vòng tay đang <strong>TỰ ĐỘNG RUNG</strong> trên cổ tay!</span>
                </>
              ) : testCountdown !== null && testCountdown > 0 ? (
                <>
                  <Sparkles className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
                  <span>
                    Đang đếm ngược: <strong>{testCountdown}s</strong> nữa vòng tay sẽ <strong>TỰ ĐỘNG RUNG</strong>!
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Đúng <strong>{alertTime}</strong>, vòng tay sẽ <strong>TỰ ĐỘNG RUNG</strong> mà không cần bấm!
                  </span>
                </>
              )}
            </div>

            {/* Countdown Test Quick Button */}
            {onStartTestCountdown && (
              <div className="mt-2.5 pt-2 border-t border-slate-200/70 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Muốn kiểm tra tính năng tự rung?</span>
                <button
                  type="button"
                  onClick={() => onStartTestCountdown(10)}
                  disabled={testCountdown !== null && testCountdown > 0}
                  className="cursor-pointer text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 disabled:opacity-50 px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow-xs active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
                  <span>{testCountdown !== null ? `Đếm: ${testCountdown}s...` : "⚡ Thử tự rung sau 10s"}</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Vibration Controls */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              id="watch-btn-vibrate"
              onClick={() => {
                soundManager.playClick();
                if (isVibrating) {
                  onStopVibration();
                } else {
                  onTriggerVibration();
                }
              }}
              className={`cursor-pointer py-3 px-3 rounded-xl transition flex items-center justify-center gap-1.5 border shadow-sm ${
                isVibrating
                  ? "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100"
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>{isVibrating ? "Tắt rung" : "Thử rung thủ công"}</span>
            </button>

            <button
              id="watch-btn-confirm-study"
              onClick={() => {
                soundManager.playClick();
                onStopVibration();
                onStartStudy();
              }}
              className="cursor-pointer py-3 px-3 rounded-xl bg-gradient-to-r from-[#315bea] to-[#4364ee] hover:from-[#2548bd] hover:to-[#315bea] text-white transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Mở bài ôn trên điện thoại</span>
            </button>
          </div>

          {/* Switch real clock & Bluetooth sync indicator */}
          <div className="mt-3.5 flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-100">
            <span className="flex items-center gap-1 text-slate-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Bluetooth Low-Energy 5.3
            </span>
            <button
              onClick={() => {
                soundManager.playClick();
                setUseRealClock(!useRealClock);
              }}
              className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              {useRealClock ? "Giờ mẫu (19:00)" : "Giờ thực tế"}
            </button>
          </div>
        </div>
      </div>

      {/* Visual Strap Bottom (Textured silicone look) */}
      <div className="w-32 h-14 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900 rounded-b-2xl shadow-md border-b border-slate-700/60 -mt-3 flex flex-col items-center justify-center space-y-1">
        <div className="w-12 h-0.5 bg-slate-700/40 rounded-full"></div>
        <div className="w-16 h-1 bg-slate-700/80 rounded-full"></div>
      </div>
    </div>
  );
};
