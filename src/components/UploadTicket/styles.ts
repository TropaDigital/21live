import { DropzoneRootProps } from 'react-dropzone';

import styled, { css } from 'styled-components';

interface MessageColorsProps {
  default: string;
  error: string;
  success: string;
}

interface UploadMessageProps {
  type?: 'default' | 'error' | 'success';
}

interface DropContainerProps extends DropzoneRootProps {
  isDragActive: boolean;
  isDragReject: boolean;
}

interface PropsFiles {
  isDisabed?: boolean;
}

const messageColors: MessageColorsProps = {
  default: '#0046B5',
  error: '#e57878',
  success: '#06D6A0'
};

const dragActive = css`
  border-color: #06d6a0;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone'
})<DropContainerProps>`
  border: 1px dashed #d0d5dd;
  border-radius: 8px;
  padding: 16px 24px;
  cursor: pointer;
  transition: height 0.2s ease;
  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject};
  margin-bottom: 20px;

  &.disabled {
    cursor: not-allowed;
  }
`;

export const UploadMessage = styled.p<UploadMessageProps>`
  display: flex;
  color: ${(props) => messageColors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 4px 0;

  font-weight: 600;
  font-size: 14px;
  line-height: 20px;

  span {
    color: #667085;
    font-weight: 400;
    margin-left: 4px;
  }
`;

export const BoxUploaded = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div<PropsFiles>`
  ${(props) =>
    props.isDisabed &&
    css`
      opacity: 0.4;
      background: #e2e8f0;
      cursor: not-allowed;
    `}

  width: 100%;
  height: 100%;
`;
