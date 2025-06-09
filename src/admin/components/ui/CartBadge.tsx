"use client"
import { Badge, badgeClasses, styled } from "@mui/material";

export const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -8px;
    right: 15px;
    font-size: 18px;
    font-weight: bold;
    min-width: 24px;
    height: 24px;
    padding: 4px;
  }
`;
