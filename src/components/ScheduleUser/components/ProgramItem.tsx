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
  const { image, title, since, till, isPause } = data;

  const sinceTime = formatTime(since).toLowerCase();
  const tillTime = formatTime(till).toLowerCase();

  return (
    <ProgramBox width={styles.width} style={styles.position}>
      {isPause === 'new' && (
        <ProgramContent
          style={{ background: '#DEF6ED', border: '1px solid #00C899' }}
          width={styles.width}
          isLive={isLive}
        >
          <ProgramFlex>
            <ProgramStack>
              <ProgramTitle style={{ color: '#005C31' }}>{title}</ProgramTitle>
              <ProgramText style={{ color: '#005C31' }}>
                {sinceTime} - {tillTime}
              </ProgramText>
            </ProgramStack>
          </ProgramFlex>
        </ProgramContent>
      )}

      {isPause === 'pause' && (
        <ProgramContent
          style={{ background: '#FEF3F2', border: '1px solid #FDA29B' }}
          width={styles.width}
          isLive={isLive}
        >
          <ProgramFlex>
            <ProgramStack>
              <ProgramTitle style={{ color: '#7A271A' }}>{title}</ProgramTitle>
              <ProgramText style={{ color: '#7A271A' }}>
                {sinceTime} - {tillTime}
              </ProgramText>
            </ProgramStack>
          </ProgramFlex>
        </ProgramContent>
      )}

      {isPause === 'job' && (
        <ProgramContent width={styles.width} isLive={isLive}>
          <ProgramFlex>
            <ProgramStack>
              <ProgramTitle>{title}</ProgramTitle>
              <ProgramText>
                {sinceTime} - {tillTime}
              </ProgramText>
            </ProgramStack>
          </ProgramFlex>
        </ProgramContent>
      )}
    </ProgramBox>
  );
};
