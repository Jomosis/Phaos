import { Button } from "~/components/ui/button";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { useNavigate } from "react-router";

export function Welcome() {
  let navigate = useNavigate();
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="Phaos"
              className="block w-full dark:hidden drop-shadow-[0_0_1rem_rgba(233,202,3,0.75)]"
            />
            <img
              src={logoDark}
              alt="Phaos"
              className="hidden w-full dark:block drop-shadow-[0_0_1rem_rgba(233,202,3,0.75)]"
            />
          </div>
        </header>
        <div>
          <Button onClick={() => navigate("/chat")}>
            Start Chat
          </Button>
        </div>
        <div className="max-w-[800px] w-full space-y-6 px-4">
          <p className="leading-6 font-sans text-[2rem] text-gray-700 dark:text-gray-200 text-center">
            An AI agent-driven Snapchat, inspired by Eliza.
          </p>
        </div>
        <div className="mt-6 text-left">
          <div className="text-base font-bold mb-4">
              Features
          </div>
          <div className="mb-2">AI driven truth prediction based on the data provided by users</div>
          <div>
            Support Users to choose an interval or number of people to see the truth and then clear this truth on the platform
          </div>
        </div>
      </div>
    </main>
  );
}

