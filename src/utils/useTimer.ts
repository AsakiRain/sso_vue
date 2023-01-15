import { Ref, ref } from "vue";
interface TimerOption {
  name: string | undefined;
  memory: Boolean | undefined;
  immediate: Boolean | undefined;
  num: number;
  type: "up" | "down";
  step: number;
  init: Function | undefined;
  onStart: Function | undefined;
  onTick: Function | undefined;
  trigger: Function | undefined;
  onTrigger: Function | undefined;
  onStop: Function | undefined;
}

class useTimer {
  name: string;
  memory: Boolean;
  immediate: Boolean;
  num: Ref<number>;
  type: Ref<"up" | "down">;
  step: number;
  init: Function | undefined;
  onStart: Function | undefined;
  onTick: Function | undefined;
  trigger: Function | undefined;
  onTrigger: Function | undefined;
  onStop: Function | undefined;

  initialNum: number;
  initialType: "up" | "down";
  timerHandler: any;
  running: Boolean;

  constructor(option: Partial<TimerOption>) {
    this.name = option.name || "timer";
    this.memory = option.memory || false;
    this.immediate = option.immediate || false;
    this.num = ref(option.num || 0);
    this.type = ref(option.type || "up");
    this.step = option.step || 1;
    this.init = option.init;
    this.onStart = option.onStart;
    this.onTick = option.onTick;
    this.trigger = option.trigger;
    this.onTrigger = option.onTrigger;
    this.onStop = option.onStop;

    this.initialNum = option.num || 0;
    this.initialType = option.type || "up";
    this.timerHandler = null;
    this.running = false;

    this.init && this.init(this);
    this.memory && this.recover();
    this.immediate && this.start();
  }

  setNum(num: number) {
    this.num.value = num;
  }

  setType(type: "up" | "down") {
    this.type.value = type;
  }

  memorize() {
    const lsKey = `timer_${this.name}`;
    const lsValue = JSON.stringify({
      num: this.num.value,
      type: this.type.value,
    });
    localStorage.setItem(lsKey, lsValue);
  }

  recover() {
    const lsKey = `timer_${this.name}`;
    const lsValue = localStorage.getItem(lsKey);
    if (!lsValue) return;
    try {
      const { num, type } = JSON.parse(lsValue || "");
      this.num.value = num;
      this.type.value = type;
    } catch (e) {
      console.log(`Timer ${this.name} cannot resume from local storage: `);
      console.log("lsValue: ", lsValue);
    }
  }

  clean() {
    const lsKey = `timer_${this.name}`;
    localStorage.removeItem(lsKey);
  }

  start() {
    this.running = true;
    this.onStart && this.onStart(this);

    this.timerHandler = setInterval(() => {
      if (this.type.value === "up") this.num.value += this.step;
      if (this.type.value === "down") this.num.value -= this.step;

      this.memory && this.memorize();
      this.onTick && this.onTick(this);

      if (this.trigger && this.trigger(this)) {
        this.onTrigger && this.onTrigger(this);
      }
    }, 1000);
    console.log(`Timer ${this.name} started.`);
  }

  stop() {
    clearInterval(this.timerHandler);
    this.running = false;
    console.log(`Timer ${this.name} stopped.`);
    this.onStop && this.onStop(this);
  }

  reset = () => {
    this.stop();
    this.clean();
    this.num.value = this.initialNum;
    this.type.value = this.initialType;
    this.init && this.init(this);
    console.log(`Timer ${this.name} reset.`);
    this.immediate && this.start();
  };
}

export default useTimer;
