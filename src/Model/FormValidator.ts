interface ValidationRule {
    validate: (value: string, options?: ValidationOptions) => string | undefined;
}

type ValidationResult = string | undefined;

interface ValidationOptions {
    maxLength?: number;
    min?: number;
    max?: number;
}

const emailValidationRule: ValidationRule = {
    validate: (value: string) => {
        if (!value.trim()) {
            return 'Ce champ est obligatoire et ne peut pas être vide';
        }
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(value) ? undefined : 'Adresse email invalide';
    }
};

const passwordValidationRule: ValidationRule = {
    validate: (value: string) => {
        return value.length < 8 ? 'Le mot de passe doit contenir au moins 8 caractères' : undefined;
    }
};

const textValidationRule: ValidationRule = {
    validate: (value: string, options?: ValidationOptions) => {
        if (!value.trim()) {
            return 'Ce champ est obligatoire et ne peut pas être vide';
        }
        if (options?.maxLength && value.length > options.maxLength) {
            return `Ce champ ne peut pas dépasser ${options.maxLength} caractères`;
        }
        return undefined;
    }
};

const numberValidationRule: ValidationRule = {
    validate: (value: string, options?: ValidationOptions) => {
        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) {
            return 'Ce champ doit être un nombre';
        }
        if (options?.min !== undefined && numericValue < options.min) {
            return `La valeur doit être supérieure ou égale à ${options.min}`;
        }
        if (options?.max !== undefined && numericValue > options.max) {
            return `La valeur doit être inférieure ou égale à ${options.max}`;
        }
        return undefined;
    }
};

const dateValidationRule: ValidationRule = {
    validate: (value: string) => {
        const currentDate = new Date();
        const inputDate = new Date(value);
        if (isNaN(inputDate.getTime())) {
            return 'Date invalide';
        }
        if (inputDate < currentDate) {
            return 'La date doit être ultérieure à aujourd\'hui';
        }
        return undefined;
    }
};

const urlValidationRule: ValidationRule = {
    validate: (value: string) => {
        const re = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/;
        return re.test(value) ? undefined : 'URL invalide';
    }
};

const validationRules: Record<string, ValidationRule> = {
    email: emailValidationRule,
    password: passwordValidationRule,
    text: textValidationRule,
    number: numberValidationRule,
    date: dateValidationRule,
    url: urlValidationRule
};

export class FormValidator {
    public init(): void {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                this.validateForm(form, event); // Passer l'événement
            });
        });
    }

    private validateForm(form: HTMLFormElement, event: Event): void {
        let formIsValid = true; // Variable pour vérifier la validité globale du formulaire

        const inputs = form.querySelectorAll('input, textarea, select') as NodeListOf<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
        inputs.forEach(input => {
            this.clearError(input);

            const validationRule = validationRules[input.type];
            if (validationRule) {
                const maxLength = input.getAttribute('maxlength') ? parseInt(input.getAttribute('maxlength')!) : undefined;
                const errorMessage = validationRule.validate(input.value, { maxLength });

                if (errorMessage) {
                    this.showError(input, errorMessage);
                    formIsValid = false; // Si un champ est invalide, le formulaire n'est pas valide
                }
            }
        });

        // Si le formulaire n'est pas valide, empêcher sa soumission
        if (!formIsValid) {
            event.preventDefault();
        }
    }

    private clearError(input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): void {
        const existingError = input.parentElement?.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    private showError(input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, message: string): void {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message text-red-600 mt-2 text-sm';
        errorElement.innerText = message;
        input.parentElement?.appendChild(errorElement);
    }
}

// Initialisation du validateur de formulaire
const formValidator = new FormValidator();
formValidator.init();
