import styled, { css } from "styled-components";
import { DropzoneRootProps } from 'react-dropzone';

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

const messageColors: MessageColorsProps = {
  default: "#0046B5",
  error: "#e57878",
  success: "#06D6A0"
};

const dragActive = css`
  border-color: #06D6A0;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: "dropzone"
})<DropContainerProps>`
  border: 1px dashed #D0D5DD;
  border-radius: 8px;
  padding: 16px 24px;
  cursor: pointer;
  transition: height 0.2s ease;
  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};
  margin-bottom: 20px;
`;

export const UploadMessage = styled.p<UploadMessageProps>`
  display: flex;
  color: ${props => messageColors[props.type || "default"]};
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