import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IoIosArrowDown } from "react-icons/io";

export function BasicAccordion({tabla,nombre}) {
  return (
      <Accordion style={{border:" 1px solid #21610B"}} defaultExpanded>
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{borderBottom:"1px solid #e0e0e0"}}
        >
          {nombre}
        </AccordionSummary>
        <AccordionDetails>
                {tabla}
        </AccordionDetails>
      </Accordion>
  );
}