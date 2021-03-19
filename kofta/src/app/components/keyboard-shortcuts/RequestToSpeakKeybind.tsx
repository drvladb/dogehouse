import React, { useEffect, useState } from "react";
import { recordKeyCombination } from "react-hotkeys";
import { useKeyMapStore } from "../../../webrtc/stores/useKeyMapStore";
import { useTypeSafeTranslation } from "../../utils/useTypeSafeTranslation";
import { Button } from "../Button";

interface RequestToSpeakKeybindProps {
  className?: string;
}

export const RequestToSpeakKeybind: React.FC<RequestToSpeakKeybindProps> = ({
  className,
}) => {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const { t } = useTypeSafeTranslation();
  const {
    keyNames: { REQUEST_TO_SPEAK },
    setRequestToSpeakKeybind,
  } = useKeyMapStore();
  useEffect(() => {
    if (count > 0) {
      const unsub = recordKeyCombination(({ id }) => {
        setActive(false);
        setRequestToSpeakKeybind(id as string);
      });

      return () => unsub();
    }
  }, [count, setRequestToSpeakKeybind]);

  return (
    <div className={`flex items-center ${className}`}>
      <Button
        variant="small"
        onClick={() => {
          setCount((c) => c + 1);
          setActive(true);
        }}
      >
        {t("components.keyboardShortcuts.setKeybind")}
      </Button>
      <div className={`ml-4`}>
        {t("components.keyboardShortcuts.toggleRequestToSpeak")}:{" "}
        <span className={`font-bold text-lg`}>
          {active
            ? t("components.keyboardShortcuts.listening")
            : REQUEST_TO_SPEAK}
        </span>
      </div>
    </div>
  );
};
