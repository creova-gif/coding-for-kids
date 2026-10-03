import * as Blockly from "blockly";
import "blockly/blocks";
import { javascriptGenerator } from "blockly/javascript";
import { ArrowLeft, Bot, CheckCircle2, Lightbulb, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { msimboMissions, msimboUi, type MsimboCheck, type MsimboLanguage } from "@/lib/msimboMissions";
import "./Msimbo.css";

type RunState = "ready" | "ok" | "bad";

type SpritePosition = {
  left: number;
  top: number;
};

function checkMission(spec: MsimboCheck, log: string[], usedIf: boolean) {
  const says = log.filter((item) => item.startsWith("SAY:"));
  const moves = log.filter((item) => item.startsWith("MOVE:"));
  if (spec.minSay && says.length < spec.minSay) return false;
  if (spec.minMove && moves.length < spec.minMove) return false;
  if (spec.minMoveRight && log.filter((item) => item === "MOVE:right").length < spec.minMoveRight) return false;
  if (spec.requireIf && !usedIf) return false;
  if (spec.sayIncludes && !says.some((item) => item.toLowerCase().includes(spec.sayIncludes!.toLowerCase()))) return false;
  return true;
}

function registerBlocks() {
  Blockly.Blocks.ms_when_run = {
    init() {
      this.appendDummyInput().appendField("when run / anza");
      this.setNextStatement(true);
      this.setColour("#C45C26");
    },
  };
  javascriptGenerator.forBlock.ms_when_run = () => "";

  Blockly.Blocks.ms_say = {
    init() {
      this.appendValueInput("TEXT").setCheck("String").appendField("say / sema");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("#C4A35A");
    },
  };
  javascriptGenerator.forBlock.ms_say = (block) => `say(${javascriptGenerator.valueToCode(block, "TEXT", 0) || "''"});\n`;

  Blockly.Blocks.ms_move = {
    init() {
      this.appendDummyInput()
        .appendField("move / sogea")
        .appendField(new Blockly.FieldDropdown([["right / kulia", "right"], ["left / kushoto", "left"], ["up / juu", "up"], ["down / chini", "down"]]), "DIR");
      this.appendValueInput("N").setCheck("Number");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("#4E8FA8");
    },
  };
  javascriptGenerator.forBlock.ms_move = (block) => `move(${JSON.stringify(block.getFieldValue("DIR"))}, ${javascriptGenerator.valueToCode(block, "N", 0) || "1"});\n`;
}

export default function Msimbo() {
  const blocklyRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const [language, setLanguage] = useState<MsimboLanguage>("en");
  const [englishOnly, setEnglishOnly] = useState(false);
  const [aiOff, setAiOff] = useState(false);
  const [missionIndex, setMissionIndex] = useState(0);
  const [runState, setRunState] = useState<RunState>("ready");
  const [logText, setLogText] = useState<string>(msimboUi.en.ready);
  const [bubble, setBubble] = useState("");
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [spritePosition, setSpritePosition] = useState<SpritePosition>({ left: 20, top: 70 });
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  const mission = msimboMissions[missionIndex];
  const copy = mission[language];
  const ui = msimboUi[language];
  const progressLabel = `${mission.id} / ${msimboMissions.length}`;
  const completionLabel = useMemo(() => `${completedMissions.length}/${msimboMissions.length} missions`, [completedMissions.length]);

  useEffect(() => {
    registerBlocks();
    if (!blocklyRef.current) return;

    const toolbox = Blockly.utils.xml.textToDom(`
      <xml>
        <category name="Start" colour="#C45C26"><block type="ms_when_run"></block></category>
        <category name="Say" colour="#C4A35A"><block type="ms_say"><value name="TEXT"><shadow type="text"><field name="TEXT">Habari Arusha!</field></shadow></value></block></category>
        <category name="Move" colour="#4E8FA8"><block type="ms_move"><field name="DIR">right</field><value name="N"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block></category>
        <category name="Loops" colour="#3D4A38"><block type="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">3</field></shadow></value></block></category>
        <category name="Logic" colour="#1A2744"><block type="controls_if"></block><block type="logic_boolean"></block></category>
      </xml>
    `);

    const workspace = Blockly.inject(blocklyRef.current, {
      toolbox,
      renderer: "zelos",
      grid: { spacing: 20, length: 3, colour: "#ecd9b8", snap: true },
      zoom: { controls: true, wheel: false },
      trashcan: true,
    });
    workspaceRef.current = workspace;

    const start = workspace.newBlock("ms_when_run");
    start.initSvg();
    start.render();
    start.moveBy(40, 40);

    return () => {
      workspace.dispose();
      workspaceRef.current = null;
    };
  }, []);

  useEffect(() => {
    setRunState("ready");
    setLogText(msimboUi[language].ready);
    setBubble("");
    setBubbleVisible(false);
    setSpritePosition({ left: 20, top: 70 });
  }, [language, missionIndex]);

  const resetStage = () => {
    setBubble("");
    setBubbleVisible(false);
    setSpritePosition({ left: 20, top: 70 });
  };

  const handleLanguageChange = (nextLanguage: MsimboLanguage) => {
    if (englishOnly) return;
    setLanguage(nextLanguage);
  };

  const showHint = () => {
    if (aiOff) {
      setLogText(ui.aiOff);
      setRunState("bad");
      return;
    }
    setLogText(`${language === "sw" ? "Kidokezo: " : "Hint: "}${copy.hint}`);
    setRunState("ready");
  };

  const runBlocks = () => {
    const workspace = workspaceRef.current;
    if (!workspace) return;

    resetStage();
    const executionLog: string[] = [];
    const usedIf = workspace.getAllBlocks(false).some((block) => block.type === "controls_if");
    const say = (text: unknown) => {
      const message = String(text);
      executionLog.push(`SAY:${message}`);
      setBubble(message);
      setBubbleVisible(true);
    };
    const move = (direction: string, amount: unknown) => {
      const step = 28 * (Number(amount) || 1);
      executionLog.push(`MOVE:${direction}`);
      setSpritePosition((current) => ({
        left: Math.max(8, Math.min(250, current.left + (direction === "right" ? step : direction === "left" ? -step : 0))),
        top: Math.max(8, Math.min(120, current.top + (direction === "down" ? step : direction === "up" ? -step : 0))),
      }));
    };

    try {
      const code = javascriptGenerator.workspaceToCode(workspace);
      new Function("say", "move", code)(say, move);
      const passed = checkMission(mission.check, executionLog, usedIf);
      setRunState(passed ? "ok" : "bad");
      setLogText(passed ? `${ui.ok}${copy.goal}` : ui.almost);
      if (passed) {
        setCompletedMissions((current) => current.includes(mission.id) ? current : [...current, mission.id]);
      }
    } catch {
      setRunState("bad");
      setLogText(ui.broke);
    }
  };

  return (
    <section className="msimbo-page">
      <header className="msimbo-header">
        <div className="msimbo-brand"><span>Msimbo</span> <b>Arusha</b></div>
        <div className="msimbo-controls">
          <Link to="/learn" className="msimbo-back"><ArrowLeft size={15} /> LittleMinds</Link>
          <select value={language} disabled={englishOnly} onChange={(event) => handleLanguageChange(event.target.value as MsimboLanguage)} aria-label="Language">
            <option value="en">English</option>
            <option value="sw">Kiswahili</option>
          </select>
          <label className="msimbo-toggle"><input type="checkbox" checked={englishOnly} onChange={(event) => { setEnglishOnly(event.target.checked); if (event.target.checked) setLanguage("en"); }} /> {ui.englishOnly}</label>
          <label className="msimbo-toggle"><input type="checkbox" checked={aiOff} onChange={(event) => setAiOff(event.target.checked)} /> {ui.aiOffLabel}</label>
          <select value={missionIndex} onChange={(event) => setMissionIndex(Number(event.target.value))} aria-label="Choose mission">
            {msimboMissions.map((item, index) => <option key={item.id} value={index}>{item.id}. {item[language].title}</option>)}
          </select>
          <button type="button" className="msimbo-button ghost" onClick={showHint} disabled={aiOff}>{aiOff ? ui.aiOffLabel : ui.hint}</button>
          <button type="button" className="msimbo-button go" onClick={runBlocks}>{ui.run}</button>
        </div>
      </header>

      <div className="msimbo-mission-bar">
        <span className="msimbo-pill">{progressLabel}</span>
        <div><p className="msimbo-kicker">Njia ya Msimbo · Arusha</p><h1>{copy.title}</h1></div>
        <span className="msimbo-pill">{copy.goal}</span>
        <span className="msimbo-pill concept">{mission.concept}</span>
        <span className="msimbo-progress"><CheckCircle2 size={15} /> {completionLabel}</span>
      </div>

      <div className="msimbo-layout">
        <div ref={blocklyRef} className="msimbo-blockly" aria-label="Blockly coding workspace" />
        <aside className="msimbo-aside">
          <div className="msimbo-stage" aria-label="Mission stage">
            <div className="msimbo-stage-sky" />
            <div className="msimbo-sprite" style={{ left: spritePosition.left, top: spritePosition.top }}>{mission.emoji}</div>
            {bubbleVisible && <div className="msimbo-bubble">{bubble}</div>}
          </div>
          <div className="msimbo-story-card"><div className="msimbo-story-icon"><Bot size={17} /></div><p>{copy.story}</p></div>
          <div className={`msimbo-log ${runState}`} aria-live="polite">{logText}</div>
          <div className="msimbo-safety"><ShieldCheck size={16} /><span>Local preview: blocks run in this page only. No account or child data is sent anywhere.</span></div>
          <div className="msimbo-help"><Lightbulb size={16} /><span>Build a little, run it, then change one thing and try again.</span></div>
        </aside>
      </div>
    </section>
  );
}
