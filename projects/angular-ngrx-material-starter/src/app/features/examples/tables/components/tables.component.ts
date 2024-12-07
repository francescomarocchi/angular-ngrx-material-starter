import {
  ChangeDetectionStrategy,
  Component,
  effect,
  viewChild
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'anms-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatPaginatorModule]
})
export class TablesComponent {
  protected columns = ['position', 'name', 'weight', 'symbol'];
  protected dataSource = new MatTableDataSource<PeriodicElement>(list);

  private paginator = viewChild(MatPaginator);

  constructor() {
    effect(() => {
      this.dataSource.paginator = this.paginator() ?? null;
    });
  }
}

const list: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', symbol: 'H', weight: 1.008 },
  { position: 2, name: 'Helium', symbol: 'He', weight: 4.002602 },
  { position: 3, name: 'Lithium', symbol: 'Li', weight: 6.94 },
  { position: 4, name: 'Beryllium', symbol: 'Be', weight: 9.0122 },
  { position: 5, name: 'Boron', symbol: 'B', weight: 10.81 },
  { position: 6, name: 'Carbon', symbol: 'C', weight: 12.011 },
  { position: 7, name: 'Nitrogen', symbol: 'N', weight: 14.007 },
  { position: 8, name: 'Oxygen', symbol: 'O', weight: 15.999 },
  { position: 9, name: 'Fluorine', symbol: 'F', weight: 18.998 },
  { position: 10, name: 'Neon', symbol: 'Ne', weight: 20.18 },
  { position: 11, name: 'Sodium', symbol: 'Na', weight: 22.99 },
  { position: 12, name: 'Magnesium', symbol: 'Mg', weight: 24.305 },
  { position: 13, name: 'Aluminum', symbol: 'Al', weight: 26.982 },
  { position: 14, name: 'Silicon', symbol: 'Si', weight: 28.085 },
  { position: 15, name: 'Phosphorus', symbol: 'P', weight: 30.974 },
  { position: 16, name: 'Sulfur', symbol: 'S', weight: 32.06 },
  { position: 17, name: 'Chlorine', symbol: 'Cl', weight: 35.45 },
  { position: 18, name: 'Argon', symbol: 'Ar', weight: 39.948 },
  { position: 19, name: 'Potassium', symbol: 'K', weight: 39.098 },
  { position: 20, name: 'Calcium', symbol: 'Ca', weight: 40.078 },
  { position: 21, name: 'Scandium', symbol: 'Sc', weight: 44.956 },
  { position: 22, name: 'Titanium', symbol: 'Ti', weight: 47.867 },
  { position: 23, name: 'Vanadium', symbol: 'V', weight: 50.942 },
  { position: 24, name: 'Chromium', symbol: 'Cr', weight: 52.0 },
  { position: 25, name: 'Manganese', symbol: 'Mn', weight: 54.938 },
  { position: 26, name: 'Iron', symbol: 'Fe', weight: 55.845 },
  { position: 27, name: 'Cobalt', symbol: 'Co', weight: 58.933 },
  { position: 28, name: 'Nickel', symbol: 'Ni', weight: 58.693 },
  { position: 29, name: 'Copper', symbol: 'Cu', weight: 63.546 },
  { position: 30, name: 'Zinc', symbol: 'Zn', weight: 65.38 },
  { position: 31, name: 'Gallium', symbol: 'Ga', weight: 69.723 },
  { position: 32, name: 'Germanium', symbol: 'Ge', weight: 72.63 },
  { position: 33, name: 'Arsenic', symbol: 'As', weight: 74.922 },
  { position: 34, name: 'Selenium', symbol: 'Se', weight: 78.971 },
  { position: 35, name: 'Bromine', symbol: 'Br', weight: 79.904 },
  { position: 36, name: 'Krypton', symbol: 'Kr', weight: 83.798 },
  { position: 37, name: 'Rubidium', symbol: 'Rb', weight: 85.468 },
  { position: 38, name: 'Strontium', symbol: 'Sr', weight: 87.62 },
  { position: 39, name: 'Yttrium', symbol: 'Y', weight: 88.905 },
  { position: 40, name: 'Zirconium', symbol: 'Zr', weight: 91.224 },
  { position: 41, name: 'Niobium', symbol: 'Nb', weight: 92.906 },
  { position: 42, name: 'Molybdenum', symbol: 'Mo', weight: 95.95 },
  { position: 43, name: 'Technetium', symbol: 'Tc', weight: 98 },
  { position: 44, name: 'Ruthenium', symbol: 'Ru', weight: 101.07 },
  { position: 45, name: 'Rhodium', symbol: 'Rh', weight: 102.91 },
  { position: 46, name: 'Palladium', symbol: 'Pd', weight: 106.42 },
  { position: 47, name: 'Silver', symbol: 'Ag', weight: 107.8682 },
  { position: 48, name: 'Cadmium', symbol: 'Cd', weight: 112.414 },
  { position: 49, name: 'Indium', symbol: 'In', weight: 114.818 },
  { position: 50, name: 'Tin', symbol: 'Sn', weight: 118.71 },
  { position: 51, name: 'Antimony', symbol: 'Sb', weight: 121.76 },
  { position: 52, name: 'Tellurium', symbol: 'Te', weight: 127.6 },
  { position: 53, name: 'Iodine', symbol: 'I', weight: 126.904 },
  { position: 54, name: 'Xenon', symbol: 'Xe', weight: 131.293 },
  { position: 55, name: 'Cesium', symbol: 'Cs', weight: 132.905 },
  { position: 56, name: 'Barium', symbol: 'Ba', weight: 137.327 },
  { position: 57, name: 'Lanthanum', symbol: 'La', weight: 138.905 },
  { position: 58, name: 'Cerium', symbol: 'Ce', weight: 140.116 },
  { position: 59, name: 'Praseodymium', symbol: 'Pr', weight: 140.907 },
  { position: 60, name: 'Neodymium', symbol: 'Nd', weight: 144.242 },
  { position: 61, name: 'Promethium', symbol: 'Pm', weight: 145 },
  { position: 62, name: 'Samarium', symbol: 'Sm', weight: 150.36 },
  { position: 63, name: 'Europium', symbol: 'Eu', weight: 151.984 },
  { position: 64, name: 'Gadolinium', symbol: 'Gd', weight: 157.25 },
  { position: 65, name: 'Terbium', symbol: 'Tb', weight: 158.925 },
  { position: 66, name: 'Dysprosium', symbol: 'Dy', weight: 162.5 },
  { position: 67, name: 'Holmium', symbol: 'Ho', weight: 164.93 },
  { position: 68, name: 'Erbium', symbol: 'Er', weight: 167.259 },
  { position: 69, name: 'Thulium', symbol: 'Tm', weight: 168.934 },
  { position: 70, name: 'Ytterbium', symbol: 'Yb', weight: 173.04 },
  { position: 71, name: 'Lutetium', symbol: 'Lu', weight: 174.966 },
  { position: 72, name: 'Hafnium', symbol: 'Hf', weight: 178.49 },
  { position: 73, name: 'Tantalum', symbol: 'Ta', weight: 180.947 },
  { position: 74, name: 'Tungsten', symbol: 'W', weight: 183.84 },
  { position: 75, name: 'Rhenium', symbol: 'Re', weight: 186.207 },
  { position: 76, name: 'Osmium', symbol: 'Os', weight: 190.23 },
  { position: 77, name: 'Iridium', symbol: 'Ir', weight: 192.217 },
  { position: 78, name: 'Platinum', symbol: 'Pt', weight: 195.084 },
  { position: 79, name: 'Gold', symbol: 'Au', weight: 196.966569 },
  { position: 80, name: 'Mercury', symbol: 'Hg', weight: 200.592 },
  { position: 81, name: 'Thallium', symbol: 'Tl', weight: 204.38 },
  { position: 82, name: 'Lead', symbol: 'Pb', weight: 207.2 },
  { position: 83, name: 'Bismuth', symbol: 'Bi', weight: 208.98 },
  { position: 84, name: 'Polonium', symbol: 'Po', weight: 209 },
  { position: 85, name: 'Astatine', symbol: 'At', weight: 210 },
  { position: 86, name: 'Radon', symbol: 'Rn', weight: 222 },
  { position: 87, name: 'Francium', symbol: 'Fr', weight: 223 },
  { position: 88, name: 'Radium', symbol: 'Ra', weight: 226.025 },
  { position: 89, name: 'Actinium', symbol: 'Ac', weight: 227.027 },
  { position: 90, name: 'Thorium', symbol: 'Th', weight: 232.038 },
  { position: 91, name: 'Protactinium', symbol: 'Pa', weight: 231.035 },
  { position: 92, name: 'Uranium', symbol: 'U', weight: 238.0289 },
  { position: 93, name: 'Neptunium', symbol: 'Np', weight: 237 },
  { position: 94, name: 'Plutonium', symbol: 'Pu', weight: 244 },
  { position: 95, name: 'Americium', symbol: 'Am', weight: 243 },
  { position: 96, name: 'Curium', symbol: 'Cm', weight: 247 },
  { position: 97, name: 'Berkelium', symbol: 'Bk', weight: 247 },
  { position: 98, name: 'Californium', symbol: 'Cf', weight: 251 },
  { position: 99, name: 'Einsteinium', symbol: 'Es', weight: 252 },
  { position: 100, name: 'Fermium', symbol: 'Fm', weight: 257 },
  { position: 101, name: 'Mendelevium', symbol: 'Md', weight: 258 },
  { position: 102, name: 'Nobelium', symbol: 'No', weight: 259 },
  { position: 103, name: 'Lawrencium', symbol: 'Lr', weight: 262 },
  { position: 104, name: 'Rutherfordium', symbol: 'Rf', weight: 267 },
  { position: 105, name: 'Dubnium', symbol: 'Db', weight: 270 },
  { position: 106, name: 'Seaborgium', symbol: 'Sg', weight: 271 },
  { position: 107, name: 'Bohrium', symbol: 'Bh', weight: 270 },
  { position: 108, name: 'Hassium', symbol: 'Hs', weight: 277 },
  { position: 109, name: 'Meitnerium', symbol: 'Mt', weight: 278 },
  { position: 110, name: 'Darmstadtium', symbol: 'Ds', weight: 281 },
  { position: 111, name: 'Roentgenium', symbol: 'Rg', weight: 280 },
  { position: 112, name: 'Copernicium', symbol: 'Cn', weight: 285 },
  { position: 113, name: 'Nihonium', symbol: 'Nh', weight: 284 },
  { position: 114, name: 'Flerovium', symbol: 'Fl', weight: 289 },
  { position: 115, name: 'Moscovium', symbol: 'Mc', weight: 288 },
  { position: 116, name: 'Livermorium', symbol: 'Lv', weight: 293 },
  { position: 117, name: 'Tennessine', symbol: 'Ts', weight: 294 },
  { position: 118, name: 'Oganesson', symbol: 'Og', weight: 294 }
];

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
