import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Плагин "my-first-extension" активирован');

    let disposable = vscode.commands.registerCommand('my-first-extension.countIncludes', () => {
        const editor = vscode.window.activeTextEditor;
        
        // 1. Проверяем, открыт ли вообще файл
        if (!editor) {
            vscode.window.showWarningMessage('Откройте файл C++ для подсчёта.');
            return;
        }

        const document = editor.document;
        
        // 2. Проверяем, что это C++ или C файл
        if (document.languageId !== 'cpp' && document.languageId !== 'c') {
            vscode.window.showWarningMessage('Текущий файл не является C++ или C файлом.');
            return;
        }

        // 3. Получаем текст и ищем #include
        const text = document.getText();
        const includeRegex = /^\s*#\s*include\s+[<"][^>"]+[>"]/gm;
        const matches = text.match(includeRegex);
        const count = matches ? matches.length : 0;

        // 4. Показываем результат
        vscode.window.showInformationMessage(`Найдено директив #include: ${count}`);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}