import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { MdOutlinePointOfSale } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import { FaUsersGear } from "react-icons/fa6";
import { GiSecurityGate } from "react-icons/gi";
import axios from '../../api/axios';

export const SidebarData = [
  // {
  //   title: 'Seguridad',
  //   icon: <AiIcons.AiFillHome />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: 'Usuarios',
  //       path: '/overview/users',
  //       icon: <IoIcons.IoIosPaper />
  //     },
  //     {
  //       title: 'Roles',
  //       path: '/overview/revenue',
  //       icon: <IoIcons.IoIosPaper />
  //     }
  //   ]
  // },
  {
    title: 'Inventario',
    path: '/Inventario',
    icon: <FaIcons.FaCartPlus />,
    IdObjeto: 2
  },
  {
    title: 'Factura',
    path: '/factura',
    icon: <MdOutlinePointOfSale />,
    IdObjeto: 3

  },
  {
    title: 'Parámetros',
    path: '/parametros',
    icon: <GrConfigure />,
    IdObjeto: 1

  },
  {
    title: 'Permisos',
    path: '/Permisos',
    icon: <GiSecurityGate />,
    IdObjeto: 4
  },
  {
    title: 'Roles',
    path: '/Roles',
    icon: <FaUsersGear />,
    IdObjeto: 5

  },
  {
    title: 'Usuarios',
    path: '/Usuarios',
    icon: <FaUsersGear />,
    IdObjeto: 6

  },
];