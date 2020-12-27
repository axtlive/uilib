import React, {
  FC,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon/icon";

export type InputSize = "lg" | "sm";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size" | "prefix"> {
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 Input 的大小 支持 lg | sm */
  size?: InputSize;
  /**添加图标 在右侧悬浮添加一个图标 用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定的组合 */
  prefix?: string | ReactElement;
  /**添加后缀 用于配置一些固定的组合 */
  suffix?: string | ReactElement;
  /**onChange 事件 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * @description: Input 输入框 通过鼠标或者键盘输入内容 是最基础的表单域的包装 支持HTMLInput 的所有基本属性
 * @param {FC<InputProps>} props
 * @return {JSX} ReactNode
 */
export const Input: FC<InputProps> = (props) => {
  // 取除所有的属性
  const { disabled, size, icon, prefix, suffix, style, ...restProps } = props;
  // 根据属性计算不同的 className
  const classes = classNames("axtlive-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prefix || suffix,
    "input-group-prefix": !!prefix,
    "input-group-suffix": !!suffix,
  });
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    // 根据属性判断是否要添加特定的节点
    <div className={classes} style={style}>
      {prefix && <div className="input-group-prefix-wrapper">{prefix}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input className="input-inner" disabled={disabled} {...restProps} />
      {suffix && <div className="input-group-suffix-wrapper">{suffix}</div>}
    </div>
  );
};

export default Input;
