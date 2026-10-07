import React, { useState } from 'react';
import { 
  Calculator, 
  CreditCard, 
  Coins, 
  Sun, 
  Check, 
  Info, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const FareCalculatorView: React.FC = () => {
  const [distanceKm, setDistanceKm] = useState<number>(14.5);
  const [commuterType, setCommuterType] = useState<
    'adult_card' | 'adult_cash' | 'student' | 'senior' | 'pwd'
  >('adult_card');
  const [isEarlyMorningRail, setIsEarlyMorningRail] = useState<boolean>(false);

  // Singapore Public Transport Distance-Based Fare (DBF) accurate formula approximation
  const computeBaseFare = (km: number, type: string) => {
    let base = 0;
    if (type === 'adult_card') {
      if (km <= 3.2) base = 1.09;
      else if (km <= 4.2) base = 1.19;
      else if (km <= 5.2) base = 1.29;
      else if (km <= 6.2) base = 1.39;
      else if (km <= 7.2) base = 1.49;
      else if (km <= 8.2) base = 1.57;
      else if (km <= 9.2) base = 1.65;
      else if (km <= 10.2) base = 1.72;
      else if (km <= 12.2) base = 1.83;
      else if (km <= 15.2) base = 1.95;
      else if (km <= 18.2) base = 2.06;
      else if (km <= 21.2) base = 2.16;
      else if (km <= 25.2) base = 2.26;
      else if (km <= 30.2) base = 2.37;
      else base = 2.47;
    } else if (type === 'adult_cash') {
      if (km <= 3.2) base = 1.90;
      else if (km <= 7.2) base = 2.30;
      else if (km <= 15.2) base = 2.70;
      else base = 3.00;
    } else if (type === 'student') {
      if (km <= 3.2) base = 0.48;
      else if (km <= 7.2) base = 0.58;
      else base = 0.70;
    } else if (type === 'senior' || type === 'pwd') {
      if (km <= 3.2) base = 0.65;
      else if (km <= 7.2) base = 0.77;
      else base = 0.98;
    }
    return base;
  };

  const calculatedBase = computeBaseFare(distanceKm, commuterType);
  const discountAmount = isEarlyMorningRail ? Math.min(0.50, calculatedBase) : 0;
  const finalFare = Math.max(0, calculatedBase - discountAmount);

  return (
    <div className="space-y-6">
      {/* Fare Calculator Card */}
      <div className="bg-white rounded-[8px] p-5 sm:p-6 border border-[#dbe0e6] card-shadow">
        <div className="border-b border-[#e9ecef] pb-4 mb-5">
          <h2 className="font-heading font-extrabold text-xl text-[#500062] tracking-tight">
            PTC Distance-Based Fare & Concession Calculator
          </h2>
          <p className="text-xs text-[#686a73] mt-0.5">
            Calculate statutory fares based on trip distance, commuter concession tier, and off-peak morning rail travel discounts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls (col 1 to 7) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Distance Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#1f1f23] uppercase tracking-wide">
                  Journey Travel Distance
                </label>
                <span className="font-heading font-extrabold text-lg text-[#500062] tabular-nums">
                  {distanceKm.toFixed(1)} km
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="0.5"
                value={distanceKm}
                onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
                className="w-full accent-[#e05615] h-2 bg-[#f0f2f5] rounded-[4px] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#686a73] mt-1 font-mono">
                <span>1.0 km (Short Feeder)</span>
                <span>20.0 km (Cross-Town)</span>
                <span>40.0 km (Terminal to Terminal)</span>
              </div>
            </div>

            {/* Commuter Type Profile */}
            <div>
              <label className="block text-xs font-bold text-[#1f1f23] uppercase tracking-wide mb-2">
                Commuter Category & Payment Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => setCommuterType('adult_card')}
                  className={`p-3 text-left rounded-[4px] border transition-colors flex items-center justify-between ${
                    commuterType === 'adult_card'
                      ? 'border-[#6c1d7e] bg-[#fbf8ff] ring-1 ring-[#6c1d7e]'
                      : 'border-[#dbe0e6] bg-white hover:bg-[#f5f2fa]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-[#500062]" />
                    <div>
                      <span className="font-heading font-bold text-xs text-[#1f1f23] block">
                        Adult (Card / SimplyGo)
                      </span>
                      <span className="text-[11px] text-[#686a73]">Standard contactless rate</span>
                    </div>
                  </div>
                  {commuterType === 'adult_card' && <Check className="w-4 h-4 text-[#6c1d7e]" />}
                </button>

                <button
                  onClick={() => setCommuterType('student')}
                  className={`p-3 text-left rounded-[4px] border transition-colors flex items-center justify-between ${
                    commuterType === 'student'
                      ? 'border-[#6c1d7e] bg-[#fbf8ff] ring-1 ring-[#6c1d7e]'
                      : 'border-[#dbe0e6] bg-white hover:bg-[#f5f2fa]'
                  }`}
                >
                  <div>
                    <span className="font-heading font-bold text-xs text-[#1f1f23] block">
                      Student Concession
                    </span>
                    <span className="text-[11px] text-[#686a73]">Primary / Secondary / JC / Poly</span>
                  </div>
                  {commuterType === 'student' && <Check className="w-4 h-4 text-[#6c1d7e]" />}
                </button>

                <button
                  onClick={() => setCommuterType('senior')}
                  className={`p-3 text-left rounded-[4px] border transition-colors flex items-center justify-between ${
                    commuterType === 'senior'
                      ? 'border-[#6c1d7e] bg-[#fbf8ff] ring-1 ring-[#6c1d7e]'
                      : 'border-[#dbe0e6] bg-white hover:bg-[#f5f2fa]'
                  }`}
                >
                  <div>
                    <span className="font-heading font-bold text-xs text-[#1f1f23] block">
                      Senior Citizen (60+ yrs)
                    </span>
                    <span className="text-[11px] text-[#686a73]">Subsidized flat rate cap</span>
                  </div>
                  {commuterType === 'senior' && <Check className="w-4 h-4 text-[#6c1d7e]" />}
                </button>

                <button
                  onClick={() => setCommuterType('pwd')}
                  className={`p-3 text-left rounded-[4px] border transition-colors flex items-center justify-between ${
                    commuterType === 'pwd'
                      ? 'border-[#6c1d7e] bg-[#fbf8ff] ring-1 ring-[#6c1d7e]'
                      : 'border-[#dbe0e6] bg-white hover:bg-[#f5f2fa]'
                  }`}
                >
                  <div>
                    <span className="font-heading font-bold text-xs text-[#1f1f23] block">
                      Persons with Disabilities
                    </span>
                    <span className="text-[11px] text-[#686a73]">PWD Concession scheme</span>
                  </div>
                  {commuterType === 'pwd' && <Check className="w-4 h-4 text-[#6c1d7e]" />}
                </button>

                <button
                  onClick={() => setCommuterType('adult_cash')}
                  className={`p-3 text-left rounded-[4px] border transition-colors flex items-center justify-between sm:col-span-2 ${
                    commuterType === 'adult_cash'
                      ? 'border-[#6c1d7e] bg-[#fbf8ff] ring-1 ring-[#6c1d7e]'
                      : 'border-[#dbe0e6] bg-white hover:bg-[#f5f2fa]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Coins className="w-4 h-4 text-[#e05615]" />
                    <div>
                      <span className="font-heading font-bold text-xs text-[#1f1f23] block">
                        Cash / Single Trip Ticket
                      </span>
                      <span className="text-[11px] text-[#686a73]">Higher tariff without transfer rebates</span>
                    </div>
                  </div>
                  {commuterType === 'adult_cash' && <Check className="w-4 h-4 text-[#6c1d7e]" />}
                </button>
              </div>
            </div>

            {/* Early Morning Rail Discount Toggle */}
            <div className="p-3.5 bg-[#fbf8ff] rounded-[4px] border border-[#d2c2d0]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isEarlyMorningRail}
                  onChange={(e) => setIsEarlyMorningRail(e.target.checked)}
                  className="mt-0.5 accent-[#500062] w-4 h-4 rounded"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-[#e05615]" />
                    <span className="font-heading font-bold text-xs text-[#1f1f23]">
                      Early Morning Rail Travel Discount
                    </span>
                  </div>
                  <p className="text-[11px] text-[#686a73] mt-0.5">
                    Tap in at any MRT or LRT station before 7:45 AM on weekdays to receive up to $0.50 discount off your rail fare.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Fare Summary Display (col 8 to 12) */}
          <div className="lg:col-span-5 bg-[#5e1770] rounded-[8px] p-6 text-white flex flex-col justify-between card-shadow">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#fed6ff] block mb-1">
                COMPUTED FARE PAYABLE
              </span>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-heading font-extrabold text-4xl text-white font-mono tabular-nums">
                  ${finalFare.toFixed(2)}
                </span>
                <span className="text-xs text-white/80 font-medium">per passenger trip</span>
              </div>

              {/* Itemized calculation breakdown */}
              <div className="space-y-3 text-xs border-t border-white/20 pt-4">
                <div className="flex items-center justify-between text-white/90">
                  <span>Gross Distance Fare:</span>
                  <span className="font-mono tabular-nums font-bold">${calculatedBase.toFixed(2)}</span>
                </div>
                {isEarlyMorningRail && (
                  <div className="flex items-center justify-between text-[#fed6ff] font-bold">
                    <span>Pre-7:45am Rail Subsidy:</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-white/70">
                  <span>Fare Transfer Rule:</span>
                  <span>1 Journey (up to 5 transfers)</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Transfer Window:</span>
                  <span>45 mins / 2h max trip</span>
                </div>
              </div>
            </div>

            {/* Savings Tip */}
            <div className="mt-6 p-3.5 bg-black/20 rounded-[4px] border border-white/10 text-xs">
              <span className="font-bold text-[#f5adff] block mb-0.5">Frequent Commuter?</span>
              <p className="text-white/80 text-[11px] leading-relaxed">
                Adult Monthly Travel Passes (AMTP) offer unlimited train and basic bus rides for $128/month.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Travel Passes Comparison Table */}
      <div className="bg-white rounded-[8px] p-5 sm:p-6 border border-[#dbe0e6] card-shadow">
        <h3 className="font-heading font-bold text-base text-[#1f1f23] mb-3">
          Monthly Concession Passes Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#f0f2f5] border-b border-[#dbe0e6] text-[#686a73] font-bold uppercase">
                <th className="py-2.5 px-3">Pass Type</th>
                <th className="py-2.5 px-3">Eligible Group</th>
                <th className="py-2.5 px-3">Monthly Cost</th>
                <th className="py-2.5 px-3">Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e9ecef]">
              <tr className="hover:bg-[#fbf8ff]">
                <td className="py-2.5 px-3 font-bold text-[#500062]">Adult Monthly Travel Pass</td>
                <td className="py-2.5 px-3">All Adult Commuters</td>
                <td className="py-2.5 px-3 font-mono font-bold">$128.00</td>
                <td className="py-2.5 px-3 text-[#686a73]">Unlimited bus & train rides across all basic services</td>
              </tr>
              <tr className="hover:bg-[#fbf8ff]">
                <td className="py-2.5 px-3 font-bold text-[#500062]">Primary / Secondary Student Pass</td>
                <td className="py-2.5 px-3">Full-time MOE students</td>
                <td className="py-2.5 px-3 font-mono font-bold">$43.50 – $54.00</td>
                <td className="py-2.5 px-3 text-[#686a73]">Unlimited basic bus & rail journeys</td>
              </tr>
              <tr className="hover:bg-[#fbf8ff]">
                <td className="py-2.5 px-3 font-bold text-[#500062]">Senior Citizen Monthly Pass</td>
                <td className="py-2.5 px-3">Singaporeans 60 years & above</td>
                <td className="py-2.5 px-3 font-mono font-bold">$64.00</td>
                <td className="py-2.5 px-3 text-[#686a73]">All-day unlimited public transit travel</td>
              </tr>
              <tr className="hover:bg-[#fbf8ff]">
                <td className="py-2.5 px-3 font-bold text-[#500062]">Persons with Disabilities Pass</td>
                <td className="py-2.5 px-3">Registered PWD Cardholders</td>
                <td className="py-2.5 px-3 font-mono font-bold">$64.00</td>
                <td className="py-2.5 px-3 text-[#686a73]">Unlimited bus & train transit with companion privileges</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
