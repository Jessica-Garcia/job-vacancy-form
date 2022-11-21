import { IVacancyProps } from "../../interfaces/IVacancyProps";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DynamicContent, TDocumentDefinitions } from "pdfmake/interfaces";

export const VacancyPDF = (vacancy: IVacancyProps) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const headerFile: any = [
       {
            text: 'Requisitos da Vaga de Emprego\n\n',
            fontSize: 15,
            bold: true,
            color: '#e35477',
            margin: [20, 20, 0, 45]
       }
    ];

    const detailsFile: any = [
        {
            text: 'Titulo do Cargo:\n\n',
            fontSize: 12,
            bold: true,
            color: '#e35477',

        },

        {
            text: `${vacancy.title ? vacancy.title : ''}\n\n`,
            fontSize: 10,
            bold: false,
            color:'#6b421b'
        },

        {
            text: 'Sálario:\n\n',
            fontSize: 12,
            bold: true,
            color: '#e35477',
        },
        {
            text: `${vacancy.salary ? vacancy.salary : ''}\n\n`,
            fontSize: 10,
            bold: false,
            color:'#6b421b'
        },
        
        {
            text: 'Benefícios:\n\n',
            fontSize: 12,
            bold: true,
            color: '#e35477',

        },

        {
            text: `${vacancy.benefits ? vacancy.benefits : ''}\n\n`,
            fontSize: 10,
            bold: false,
            color:'#6b421b'
        },

        {
            text: 'Etapas:\n\n',
            fontSize: 12,
            bold: true,
            color: '#e35477',
        },

        {
            text: `${vacancy.steps ? vacancy.steps : ''}\n\n`,
            fontSize: 10,
            bold: false,
            color:'#6b421b'
        },

        {
            text: 'Habilidades:\n\n',
            fontSize: 12,
            bold: true,
            color: '#e35477',
        },
        
        {
            text: `${vacancy.skills ? vacancy.skills : ''}\n\n`,
            fontSize: 10,
            bold: false,
            color:'#6b421b'
        },

        {
            text: 'Experiência:\n\n',
            fontSize: 12,
            bold: true,
            color: '#e35477',
        },

        {
            text: `${vacancy.experience ? vacancy.experience : ''}\n\n`,
            fontSize: 10,
            bold: false,
            color:'#6b421b'
        },
        
        {
            text: 'Atividades:\n\n',
            fontSize: 12,
            bold: true,
            color: '#e35477',
        },

        {
            text: `${vacancy.activities ? vacancy.activities : ''}\n\n`,
            fontSize: 10,
            bold: false,
            color:'#6b421b'
        },
        
    ]

    const FooterFile: DynamicContent = (currentPage: number, pageCount: number) => {
        return [
            {
                text: `${currentPage}/${pageCount}`,
                alignment: 'right',
                fontSize: 6,
                margin: [0, 10, 20, 0]
           }
        ]
    };
    

    const docDefinitions : TDocumentDefinitions = {
        pageSize: 'A4',
        pageMargins: [20, 50, 20, 40],

        header: [headerFile],
        content: [detailsFile],
        footer: FooterFile
    }

    if(vacancy.title && vacancy.salary ){

        pdfMake.createPdf(docDefinitions).download('Vaga')
    } else{

        return alert('Preencha os campos obrigatórios para gerar o PDF')
    }
}
