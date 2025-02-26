"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Countdown = () => {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleDurationSubmit = () => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
  const handleStart = () => {
    if (timeLeft > 0) {
      setActive(true);
      setPause(false);
    }
  };
  const handlePasue = () => {
    if (timeLeft > 0) {
      setActive(false);
      setPause(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
  const handleReset = () => {
    setActive(false);
    setPause(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  useEffect(() => {
    if (active && !pause) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  });
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const min = Math.floor((time % 3600) / 60);
    const sec = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(min).padStart(
      2,
      "0"
    )}:${String(sec).padStart(2, "0")}`;
  };
  const handleDurationChange = (e?: ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(e?.target.value) || "");
  };
  return (
    <div className="flex items-center justify-center bg-gray-200 h-screen ">
      <Card>
        <CardContent>
          <CardHeader className="text-2xl font-bold mb-4 text-gray-800">
            Countdown Timer
          </CardHeader>
          <div className="flex items-center justify-center gap-5 mb-6">
            <Input
              placeholder="Enter duration in seconds"
              className="flex-1 border-gray-300 outline-none text-md placeholder:text-md placeholder:font-medium rounded-md"
              type="number"
              value={duration}
              onChange={handleDurationChange}
            />
            <Button onClick={handleDurationSubmit} variant={"outline"}>
              Set
            </Button>
          </div>
          <div className="text-5xl font-bold text-gray-900 mb-8 text-center">
            {formatTime(timeLeft)}
          </div>
          <div className="flex justify-center items-center gap-5 mb-4">
            <Button onClick={handleStart} variant={"outline"}>
              {pause ? "Resume" : "Start"}
            </Button>
            <Button variant={"outline"} onClick={handlePasue}>
              Pause
            </Button>
            <Button variant={"outline"} onClick={handleReset}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Countdown;
