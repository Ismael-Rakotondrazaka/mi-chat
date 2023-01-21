const withOpacityValue = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
};

const shadowButton = (color) => {
  return ({ opacityValue = 1 }) => {
    return `rgb(var(${color}) / ${opacityValue}) 0px 5px 0px 0px`;
  };
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue("--color-primary"),
        danger: withOpacityValue("--color-danger"),
        warning: withOpacityValue("--color-warning"),
        info: withOpacityValue("--color-info"),
        success: withOpacityValue("--color-success"),
        disabled: withOpacityValue("--color-disabled"),

        border: withOpacityValue("--color-border"),
        "border-primary": withOpacityValue("--color-border-primary"),
        "border-danger": withOpacityValue("--color-border-danger"),
        "border-warning": withOpacityValue("--color-border-warning"),
        "border-info": withOpacityValue("--color-border-info"),
        "border-success": withOpacityValue("--color-border-success"),
        "border-disabled": withOpacityValue("--color-border-disabled"),
      },
      boxShadow: {
        button: "rgb(var(--color-border) / 0.5) 0px 5px 0px 0px",
        "button-primary": shadowButton("--color-border-primary"),
        "button-danger": shadowButton("--color-border-danger"),
        "button-warning": shadowButton("--color-border-warning"),
        "button-info": shadowButton("--color-border-info"),
        "button-success": shadowButton("--color-border-success"),
        "button-disabled": shadowButton("--color-border-disabled"),
      },
    },
  },
  plugins: [],
};
