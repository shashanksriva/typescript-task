import "./styles.css";
const app = document.getElementById("app") as HTMLElement;

export function log(text: any) {
  app.innerHTML = app.innerHTML + `<br><br>${text}`;
}

// Testing function
export function it(description: string, fn: () => boolean) {
  const passed = fn();
  log(
    `<b>TEST</b> ${description} ${
      passed
        ? "<span class='passed'>PASSED</span>"
        : "<span class='failed'>FAILED</span>"
    }`
  );
}

export function eq(obj1: object, obj2: object) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
