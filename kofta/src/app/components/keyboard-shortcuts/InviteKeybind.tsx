import React, { useEffect, useState } from "react";
import { recordKeyCombination } from "react-hotkeys";
import { useKeyMapStore } from "../../../webrtc/stores/useKeyMapStore";
import { useTypeSafeTranslation } from "../../utils/useTypeSafeTranslation";
import { Button } from "../Button";

interface InviteKeybindProps {
  className?: string;
}

export const InviteKeybind: React.FC<InviteKeybindProps> = ({ className }) => {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const { t } = useTypeSafeTranslation();
  const {
    keyNames: { INVITE },
    setInviteKeybind,
  } = useKeyMapStore();
  useEffect(() => {
    if (count > 0) {
      const unsub = recordKeyCombination(({ id }) => {
        setActive(false);
        setInviteKeybind(id as string);
      });

      return () => unsub();
    }
  }, [count, setInviteKeybind]);

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
        {t("components.keyboardShortcuts.toggleInvite")}:{" "}
        <span className={`font-bold text-lg`}>
          {active ? t("components.keyboardShortcuts.listening") : INVITE}
        </span>
      </div>
    </div>
  );
};
