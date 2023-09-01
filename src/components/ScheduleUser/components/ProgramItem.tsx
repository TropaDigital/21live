import {
  ProgramItem,
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
  useProgram
} from 'planby';

export const Program = ({ program, ...rest }: ProgramItem) => {
  const { styles, formatTime, isLive, isMinWidth } = useProgram({
    program,
    ...rest
  });

  const { data } = program;
  const { image, title, since, till } = data;

  const sinceTime = formatTime(since).toLowerCase();
  const tillTime = formatTime(till).toLowerCase();

  return (
    <ProgramBox width={styles.width} style={styles.position}>
      <ProgramContent width={styles.width} isLive={isLive}>
        <ProgramFlex>
          {isLive && isMinWidth && <ProgramImage src={image} alt="Preview" />}
          <ProgramStack>
            <ProgramTitle>{title}</ProgramTitle>
            <ProgramText>
              {sinceTime} - {tillTime}
            </ProgramText>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  );
};
